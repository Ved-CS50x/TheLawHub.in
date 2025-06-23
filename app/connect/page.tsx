"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share2,
  ImageIcon,
  Send,
  MoreHorizontal,
  Users,
  Flag,
  Pencil,
  Trash2,
  X,
  Check,
  AlertTriangle,
  UserX,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FadeInSection } from "@/components/fade-in-section"
import { useSession } from "next-auth/react"
import { supabase } from "@/lib/supabaseClient"

export default function ConnectPage() {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.sub || (session?.user as any)?.id;

  const [newPost, setNewPost] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [anonymousPostsToday, setAnonymousPostsToday] = useState(0)
  const [editingPost, setEditingPost] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [editImage, setEditImage] = useState<File | null>(null)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportingPostId, setReportingPostId] = useState<string | null>(null)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)

  // Real posts data
  const [posts, setPosts] = useState<any[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  // Comments state
  const [comments, setComments] = useState<{ [postId: string]: any[] }>({})
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({})

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoadingPosts(true)
    const res = await fetch("/api/connect/posts")
    const data = await res.json()
    setPosts(data)
    setLoadingPosts(false)
  }

  // Handle image upload (for post creation/edit)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (editingPost !== null) {
        setEditImage(file)
      } else {
        setSelectedImage(file)
      }
    }
  }

  // Create a new post
  const handlePost = async () => {
    if (!newPost.trim() && !selectedImage) return
    if (isAnonymous && anonymousPostsToday >= 2) {
      toast({
        title: "Anonymous Post Limit Reached",
        description: "You can only post anonymously twice per day.",
        variant: "destructive",
      })
      return
    }
    let image_url = null
    if (selectedImage && userId) {
      const fileExt = selectedImage.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, selectedImage);
      if (uploadError) {
        toast({ title: "Image Upload Failed", description: uploadError.message, variant: "destructive" });
        return;
      }
      const { data: publicUrlData } = supabase
        .storage
        .from('post-images')
        .getPublicUrl(fileName);
      image_url = publicUrlData.publicUrl;
    }
    const res = await fetch("/api/connect/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author_id: userId,
        content: newPost,
        image_url,
        is_anonymous: isAnonymous,
      }),
    })
    const post = await res.json()
    setPosts([post, ...posts])
    setNewPost("")
    setSelectedImage(null)
    if (isAnonymous) {
      setAnonymousPostsToday((prev) => prev + 1)
      setIsAnonymous(false)
    }
    toast({ title: "Post Created", description: "Your post has been published successfully." })
  }

  // Edit a post
  const handleEditPost = (postId: string) => {
    const post = posts.find((p) => p.id === postId)
    if (post) {
      setEditingPost(postId)
      setEditContent(post.content)
      setEditImage(null)
    }
  }
  const saveEditedPost = async () => {
    if (!editingPost) return
    let image_url = null
    if (editImage && userId) {
      const fileExt = editImage.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(fileName, editImage);
      if (uploadError) {
        toast({ title: "Image Upload Failed", description: uploadError.message, variant: "destructive" });
        return;
      }
      const { data: publicUrlData } = supabase
        .storage
        .from('post-images')
        .getPublicUrl(fileName);
      image_url = publicUrlData.publicUrl;
    }
    const res = await fetch("/api/connect/posts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingPost, content: editContent, image_url }),
    })
    const updated = await res.json()
    setPosts(posts.map((p) => (p.id === updated.id ? updated : p)))
    setEditingPost(null)
    setEditContent("")
    setEditImage(null)
    toast({ title: "Post Updated", description: "Your post has been updated successfully." })
  }
  const cancelEdit = () => {
    setEditingPost(null)
    setEditContent("")
    setEditImage(null)
  }

  // Delete a post
  const handleDeletePost = (postId: string) => {
    setDeletingPostId(postId)
    setDeleteDialogOpen(true)
  }
  const confirmDeletePost = async () => {
    if (!deletingPostId) return
    await fetch("/api/connect/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: deletingPostId }),
    })
    setPosts(posts.filter((post) => post.id !== deletingPostId))
    setDeleteDialogOpen(false)
    setDeletingPostId(null)
    toast({ title: "Post Deleted", description: "Your post has been deleted successfully." })
  }

  // Like/unlike a post
  const handleLike = async (postId: string, liked: boolean) => {
    if (liked) {
      await fetch("/api/connect/likes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      })
    } else {
      await fetch("/api/connect/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      })
    }
    fetchPosts()
  }

  // Fetch comments for a post
  const fetchComments = async (postId: string) => {
    const res = await fetch(`/api/connect/comments?post_id=${postId}`)
    const data = await res.json()
    setComments((prev) => ({ ...prev, [postId]: data }))
  }

  // Add a comment
  const addComment = async (postId: string) => {
    const content = commentInputs[postId]
    if (!content?.trim()) return
    const res = await fetch("/api/connect/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: postId, author_id: userId, content }),
    })
    const comment = await res.json()
    setComments((prev) => ({ ...prev, [postId]: [...(prev[postId] || []), comment] }))
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }))
  }

  // Report a post or comment
  const handleReportPost = (postId: string) => {
    setReportingPostId(postId)
    setReportDialogOpen(true)
  }
  const submitReport = async () => {
    if (!reportingPostId || !reportReason.trim()) return
    await fetch("/api/connect/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reported_id: reportingPostId,
        reported_type: "post",
        reporter_id: userId,
        reason: reportReason,
      }),
    })
    setReportDialogOpen(false)
    setConfirmationDialogOpen(true)
  }
  const closeConfirmation = () => {
    setConfirmationDialogOpen(false)
    setReportingPostId(null)
    setReportReason("")
  }

  return (
    <FadeInSection>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <FadeInSection delay={100}>
            <div className="mb-8 bg-black text-white p-6 rounded-lg text-center">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-gold-500 mr-3" />
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white">Connect</h1>
                  <p className="text-lg text-gold-500 font-medium">CommuniTea</p>
                </div>
              </div>
              <p className="text-gold-500 max-w-2xl mx-auto">
                Share. Connect. Build - From informal chats to exposing the lazy administration, TLH-Connects relate and
                understands.
              </p>
            </div>
          </FadeInSection>

          {/* Create Post */}
          <FadeInSection delay={200}>
            <Card className="border-2 border-black bg-white mb-8">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {!isAnonymous ? (
                    <Avatar className="w-10 h-10 border-2 border-gold-500">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback className="bg-gold-500 text-black">AK</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <UserX className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-black">{isAnonymous ? "Anonymous" : "Arjun Kumar"}</p>
                    <p className="text-sm text-gray-600">{isAnonymous ? "Hidden" : "NLSIU Bangalore"}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share something with your fellow law students..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="border-2 border-black resize-none"
                  rows={3}
                />

                {selectedImage && (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(selectedImage) || "/placeholder.svg"}
                      alt="Selected"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gold-500"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    <label htmlFor="image-upload">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gold-500 text-gold-600 hover:bg-gold-50"
                        asChild
                      >
                        <span>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Photo
                        </span>
                      </Button>
                    </label>
                    <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

                    <div className="flex items-center space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Switch
                              id="anonymous-mode"
                              checked={isAnonymous}
                              onCheckedChange={setIsAnonymous}
                              disabled={anonymousPostsToday >= 2}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            {anonymousPostsToday >= 2
                              ? "You've reached your anonymous post limit for today"
                              : `Anonymous posts today: ${anonymousPostsToday}/2`}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Label htmlFor="anonymous-mode" className="text-sm text-gray-600">
                        Post anonymously {anonymousPostsToday >= 2 && "(Limit reached)"}
                      </Label>
                    </div>
                  </div>
                  <Button
                    onClick={handlePost}
                    disabled={!newPost.trim() && !selectedImage}
                    className="bg-gold-500 text-black hover:bg-gold-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>

          {/* Posts Feed */}
          <FadeInSection delay={300}>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <FadeInSection key={post.id} delay={400 + index * 100}>
                  <Card className="border-2 border-black bg-white">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {post.isAnonymous ? (
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <UserX className="w-6 h-6 text-gray-600" />
                            </div>
                          ) : (
                            <Avatar className="w-10 h-10 border-2 border-gold-500">
                              <AvatarImage src={post.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="bg-gold-500 text-black">
                                {post.author
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="font-medium text-black">{post.author}</p>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-gold-500 text-black text-xs">{post.university}</Badge>
                              <span className="text-sm text-gray-500">{post.time}</span>
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {!post.isAnonymous && (
                              <>
                                <DropdownMenuItem onClick={() => handleEditPost(post.id)}>
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edit Post
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeletePost(post.id)}>
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete Post
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem onClick={() => handleReportPost(post.id)}>
                              <Flag className="w-4 h-4 mr-2" />
                              Report Post
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {editingPost === post.id ? (
                        <div className="space-y-4">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="border-2 border-black resize-none"
                            rows={3}
                          />

                          {editImage ? (
                            <div className="relative">
                              <img
                                src={URL.createObjectURL(editImage) || "/placeholder.svg"}
                                alt="Edit preview"
                                className="w-full h-64 object-cover rounded-lg border border-gray-200"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2"
                                onClick={() => setEditImage(null)}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : post.image ? (
                            <div className="relative">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt="Current image"
                                className="w-full h-64 object-cover rounded-lg border border-gray-200"
                              />
                              <Button
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2"
                                onClick={() => setPosts(posts.map((p) => (p.id === post.id ? { ...p, image: null } : p)))}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <label htmlFor={`edit-image-${post.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gold-500 text-gold-600 hover:bg-gold-50"
                                  asChild
                                >
                                  <span>
                                    <ImageIcon className="w-4 h-4 mr-2" />
                                    Add Image
                                  </span>
                                </Button>
                              </label>
                              <input
                                id={`edit-image-${post.id}`}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </div>
                          )}

                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" onClick={cancelEdit}>
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                            <Button size="sm" className="bg-gold-500 text-black hover:bg-gold-600" onClick={saveEditedPost}>
                              <Check className="w-4 h-4 mr-2" />
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-800 leading-relaxed">{post.content}</p>

                          {post.image && (
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post content"
                              className="w-full h-64 object-cover rounded-lg border border-gray-200"
                            />
                          )}
                        </>
                      )}

                      {editingPost !== post.id && (
                        <>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="flex space-x-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`flex items-center space-x-2 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
                              >
                                <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                                <span>{post.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-600">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                              </Button>
                            </div>
                          </div>

                          {/* Comment Section */}
                          <div className="space-y-3">
                            <div className="flex space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className="bg-gold-500 text-black text-xs">AK</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <Input placeholder="Write a comment..." className="border-gray-300 text-sm" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>

          {/* Load More */}
          <FadeInSection delay={500}>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-gold-500">
                Load More Posts
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Post</DialogTitle>
            <DialogDescription>
              Please provide a reason for reporting this post. Our admin team will review your report.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="report-reason">Reason for reporting</Label>
              <Textarea
                id="report-reason"
                placeholder="Please explain why you're reporting this post..."
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={submitReport}
              disabled={!reportReason.trim()}
              className="bg-gold-500 text-black hover:bg-gold-600"
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              Report Submitted
            </DialogTitle>
            <DialogDescription>
              Thank you for your report. Our admin team will review it and take appropriate action if necessary.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeConfirmation} className="bg-gold-500 text-black hover:bg-gold-600">
              Back to Posts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Delete Post
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePost}>
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FadeInSection>
  )
}
