"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Scale, Upload, Eye, EyeOff, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const NLU_LIST = [
  "National Law School of India University (NLSIU), Bangalore",
  "NALSAR University of Law, Hyderabad",
  "The West Bengal National University of Juridical Sciences (WBNUJS), Kolkata",
  "Gujarat National Law University (GNLU), Gandhinagar",
  "Rajiv Gandhi School of Intellectual Property Law (RGNUL), Kharagpur",
  "Hidayatullah National Law University (HNLU), Raipur",
  "National Law University, Jodhpur (NLUJ)",
  "Chanakya National Law University (CNLU), Patna",
  "National University of Advanced Legal Studies (NUALS), Kochi",
  "The Tamil Nadu Dr. Ambedkar Law University (TNDALU), Chennai",
  "National Law University Odisha (NLUO), Cuttack",
  "National Law University and Judicial Academy (NLUJA), Assam",
  "Damodaram Sanjivayya National Law University (DSNLU), Visakhapatnam",
  "Maharashtra National Law University (MNLU), Mumbai",
  "Maharashtra National Law University (MNLU), Nagpur",
  "Maharashtra National Law University (MNLU), Aurangabad",
  "Himachal Pradesh National Law University (HPNLU), Shimla",
  "National University of Study and Research in Law (NUSRL), Ranchi",
  "Dr. Ram Manohar Lohiya National Law University (RMLNLU), Lucknow",
  "Rajiv Gandhi National University of Law (RGNUL), Punjab",
  "National Law Institute University (NLIU), Bhopal",
  "Dharmashastra National Law University (DNLU), Jabalpur",
  "Dr. B.R. Ambedkar National Law University (BANLU), Sonipat",
  "Puducherry National Law University (PNLU), Puducherry",
  "Mizoram University School of Law, Aizawl",
]

// Demo credentials for testing
const DEMO_CREDENTIALS = {
  email: "demo@thelawHub.com",
  password: "demo123",
}

// Advertisement Component
function AdSpace({ title, className = "" }: { title: string; className?: string }) {
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center ${className}`}
    >
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Advertisement</div>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</div>
      <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">300 x 250</div>
    </div>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    personalEmail: "",
    collegeEmail: "",
    phone: "",
    university: "",
    year: "",
    username: "",
    password: "",
    confirmPassword: "",
    idCard: null as File | null,
    agreeTerms: false,
    receiveNotifications: false,
  })
  const router = useRouter()

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignInChange = (field: string, value: string) => {
    setSignInData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
      if (allowedTypes.includes(file.type)) {
        handleInputChange("idCard", file)
      } else {
        alert("Please upload only PDF or Image files (JPG, PNG)")
      }
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeTerms) {
      alert("Please agree to the Terms and Conditions")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    // Simulate registration
    setRegistrationSuccess(true)
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()

    // Check demo credentials
    if (signInData.email === DEMO_CREDENTIALS.email && signInData.password === DEMO_CREDENTIALS.password) {
      // Successful login - redirect to home page
      router.push("/home")
    } else {
      alert("Invalid credentials. Please use the demo credentials provided.")
    }
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
        {/* Left Advertisement Column */}
        <div className="hidden lg:flex flex-col w-48 p-4 space-y-4">
          <AdSpace title="Legal Books" />
          <AdSpace title="Law Courses" />
          <AdSpace title="Career Services" />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Scale className="w-10 h-10 text-gold-500 dark:text-gold-400 mr-3" />
                <h1 className="text-3xl font-bold text-black dark:text-white">The Law Hub</h1>
              </div>
            </div>

            <Card className="border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-2">Registration Successful!</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Kindly check your email for further instructions. The Admin shall review the application for
                    confirmation.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    You shall be allowed access in 1 to 2 hours. Thank you!
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setRegistrationSuccess(false)
                    setActiveTab("signin")
                  }}
                  className="bg-gold-500 text-black hover:bg-gold-600"
                >
                  Back to Sign In
                </Button>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
              © 2025 The Law Hub. All rights reserved. | Privacy Policy | Terms of Service
            </div>
          </div>
        </div>

        {/* Right Advertisement Column */}
        <div className="hidden lg:flex flex-col w-48 p-4 space-y-4">
          <AdSpace title="Legal Software" />
          <AdSpace title="Internships" />
          <AdSpace title="Study Materials" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Left Advertisement Column */}
      <div className="hidden lg:flex flex-col w-48 p-4 space-y-4">
        <AdSpace title="Legal Books" />
        <AdSpace title="Law Courses" />
        <AdSpace title="Career Services" />
        <AdSpace title="Legal Tech" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Scale className="w-10 h-10 text-gold-500 dark:text-gold-400 mr-3" />
              <h1 className="text-3xl font-bold text-black dark:text-white">The Law Hub</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Premier Platform for NLU Students</p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-gold-50 dark:bg-gold-900/20 border-2 border-gold-500 dark:border-gold-400 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-gold-600 dark:text-gold-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-black dark:text-white text-sm mb-2">Demo Access Credentials</h3>
                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p>
                    <strong>Email:</strong> demo@thelawHub.com
                  </p>
                  <p>
                    <strong>Password:</strong> demo123
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Use these credentials to access the platform for testing purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Tab Buttons */}
          <div className="flex mb-6 bg-black dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "signin" ? "bg-gold-500 text-black" : "text-white hover:text-gold-500"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "register" ? "bg-gold-500 text-black" : "text-white hover:text-gold-500"
              }`}
            >
              Register
            </button>
          </div>

          {/* Sign In Form */}
          {activeTab === "signin" && (
            <Card className="border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">Sign in to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black dark:text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="border-2 border-black dark:border-gray-600"
                      value={signInData.email}
                      onChange={(e) => handleSignInChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-black dark:text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="border-2 border-black dark:border-gray-600 pr-10"
                        value={signInData.password}
                        onChange={(e) => handleSignInChange("password", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-gold-500 text-black hover:bg-gold-600">
                    Sign In
                  </Button>
                  <div className="text-center">
                    <Link href="#" className="text-sm text-gold-600 dark:text-gold-400 hover:text-gold-700">
                      Forgot your password?
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <Card className="border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Join The Law Hub</CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300">
                  Create your account to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-black dark:text-white">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        required
                        className="border-2 border-black dark:border-gray-600"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-black dark:text-white">
                        Date of Birth *
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        required
                        className="border-2 border-black dark:border-gray-600"
                        value={formData.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="personalEmail" className="text-black dark:text-white">
                      Personal Email *
                    </Label>
                    <Input
                      id="personalEmail"
                      type="email"
                      placeholder="your.email@gmail.com"
                      required
                      className="border-2 border-black dark:border-gray-600"
                      value={formData.personalEmail}
                      onChange={(e) => handleInputChange("personalEmail", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="collegeEmail" className="text-black dark:text-white">
                      College Email (if applicable)
                    </Label>
                    <Input
                      id="collegeEmail"
                      type="email"
                      placeholder="your.email@university.edu"
                      className="border-2 border-black dark:border-gray-600"
                      value={formData.collegeEmail}
                      onChange={(e) => handleInputChange("collegeEmail", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-black dark:text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      required
                      className="border-2 border-black dark:border-gray-600"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university" className="text-black dark:text-white">
                      University *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("university", value)} required>
                      <SelectTrigger className="border-2 border-black dark:border-gray-600">
                        <SelectValue placeholder="Select your NLU" />
                      </SelectTrigger>
                      <SelectContent>
                        {NLU_LIST.map((nlu, index) => (
                          <SelectItem key={index} value={nlu}>
                            {nlu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-black dark:text-white">
                        Year *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("year", value)} required>
                        <SelectTrigger className="border-2 border-black dark:border-gray-600">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          <SelectItem value="3">3rd Year</SelectItem>
                          <SelectItem value="4">4th Year</SelectItem>
                          <SelectItem value="5">5th Year</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-black dark:text-white">
                        Username *
                      </Label>
                      <Input
                        id="username"
                        placeholder="Choose a username"
                        required
                        className="border-2 border-black dark:border-gray-600"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-black dark:text-white">
                        Password *
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          required
                          className="border-2 border-black dark:border-gray-600 pr-10"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-black dark:text-white">
                        Confirm Password *
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          required
                          className="border-2 border-black dark:border-gray-600 pr-10"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="idCard" className="text-black dark:text-white">
                      NLU ID Card *
                    </Label>
                    <div className="border-2 border-black dark:border-gray-600 border-dashed rounded-lg p-4 text-center">
                      <input
                        id="idCard"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        required
                      />
                      <label htmlFor="idCard" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gold-500 dark:text-gold-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formData.idCard ? formData.idCard.name : "Upload your NLU ID Card"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">PDF or Image files only</p>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
                        className="border-2 border-black data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
                      />
                      <Label htmlFor="terms" className="text-sm text-black dark:text-white">
                        I agree to the{" "}
                        <Link href="#" className="text-gold-600 dark:text-gold-400 hover:text-gold-700">
                          Terms and Conditions
                        </Link>{" "}
                        *
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifications"
                        checked={formData.receiveNotifications}
                        onCheckedChange={(checked) => handleInputChange("receiveNotifications", checked)}
                        className="border-2 border-black data-[state=checked]:bg-gold-500 data-[state=checked]:border-gold-500"
                      />
                      <Label htmlFor="notifications" className="text-sm text-black dark:text-white">
                        I want to receive notifications on my email/phone
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gold-500 text-black hover:bg-gold-600">
                    Register
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
            © 2025 The Law Hub. All rights reserved. | Privacy Policy | Terms of Service
          </div>
        </div>
      </div>

      {/* Right Advertisement Column */}
      <div className="hidden lg:flex flex-col w-48 p-4 space-y-4">
        <AdSpace title="Legal Software" />
        <AdSpace title="Internships" />
        <AdSpace title="Study Materials" />
        <AdSpace title="Bar Exam Prep" />
      </div>
    </div>
  )
}
