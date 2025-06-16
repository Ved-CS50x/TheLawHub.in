import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface LibraryResource {
  id: string
  title: string
  authors: string[]
  subjects: string[]
  description: string[]
  date: string
  type: string
  format: string[]
  url: string
  language: string[]
  rights: string[]
  setSpec: string[]
}

// Mock dataset of legal resources
const mockResources: LibraryResource[] = [
  {
    id: "1",
    title: "Constitutional Law in India: A Critical Analysis",
    authors: ["Dr. Rajesh Kumar", "Prof. Meera Sharma"],
    subjects: ["Constitutional Law", "Indian Constitution", "Fundamental Rights"],
    description: ["A comprehensive analysis of constitutional law in India, covering fundamental rights, directive principles, and constitutional amendments."],
    date: "2023-06-15",
    type: "article",
    format: ["PDF"],
    url: "https://example.com/constitutional-law-analysis",
    language: ["English"],
    rights: ["All rights reserved"],
    setSpec: ["constitutional"]
  },
  {
    id: "2",
    title: "Criminal Procedure Code: Recent Amendments and Implications",
    authors: ["Adv. Amit Patel"],
    subjects: ["Criminal Law", "Criminal Procedure", "Legal Reform"],
    description: ["Analysis of recent amendments to the Criminal Procedure Code and their impact on the Indian criminal justice system."],
    date: "2023-08-20",
    type: "working_paper",
    format: ["PDF", "DOCX"],
    url: "https://example.com/crpc-amendments",
    language: ["English"],
    rights: ["Creative Commons"],
    setSpec: ["criminal"]
  },
  {
    id: "3",
    title: "International Commercial Arbitration: Indian Perspective",
    authors: ["Prof. Sarah Gupta", "Dr. Vikram Singh"],
    subjects: ["International Law", "Commercial Law", "Arbitration"],
    description: ["A detailed study of international commercial arbitration from an Indian perspective, including case studies and best practices."],
    date: "2023-05-10",
    type: "thesis",
    format: ["PDF"],
    url: "https://example.com/international-arbitration",
    language: ["English"],
    rights: ["All rights reserved"],
    setSpec: ["commercial"]
  },
  {
    id: "4",
    title: "Environmental Law and Sustainable Development",
    authors: ["Dr. Priya Sharma"],
    subjects: ["Environmental Law", "Sustainable Development", "Climate Change"],
    description: ["An examination of environmental laws in India and their role in promoting sustainable development."],
    date: "2023-07-25",
    type: "article",
    format: ["PDF"],
    url: "https://example.com/environmental-law",
    language: ["English"],
    rights: ["Open Access"],
    setSpec: ["environmental"]
  },
  {
    id: "5",
    title: "Intellectual Property Rights in Digital Age",
    authors: ["Prof. Rahul Verma", "Adv. Neha Kapoor"],
    subjects: ["Intellectual Property", "Digital Law", "Copyright"],
    description: ["Analysis of intellectual property rights challenges in the digital era, with focus on Indian legal framework."],
    date: "2023-09-05",
    type: "book",
    format: ["PDF", "EPUB"],
    url: "https://example.com/ip-digital-age",
    language: ["English"],
    rights: ["All rights reserved"],
    setSpec: ["commercial"]
  },
  {
    id: "6",
    title: "Human Rights and Social Justice",
    authors: ["Dr. Anjali Desai"],
    subjects: ["Human Rights", "Social Justice", "Public Interest Litigation"],
    description: ["A comprehensive study of human rights law and social justice mechanisms in India."],
    date: "2023-04-15",
    type: "thesis",
    format: ["PDF"],
    url: "https://example.com/human-rights",
    language: ["English"],
    rights: ["Creative Commons"],
    setSpec: ["constitutional"]
  },
  {
    id: "7",
    title: "Corporate Governance and Legal Compliance",
    authors: ["Prof. Rajiv Malhotra"],
    subjects: ["Corporate Law", "Governance", "Compliance"],
    description: ["Study of corporate governance frameworks and legal compliance requirements for Indian companies."],
    date: "2023-10-10",
    type: "working_paper",
    format: ["PDF", "DOCX"],
    url: "https://example.com/corporate-governance",
    language: ["English"],
    rights: ["All rights reserved"],
    setSpec: ["commercial"]
  },
  {
    id: "8",
    title: "Cyber Law and Digital Privacy",
    authors: ["Adv. Karan Mehta", "Dr. Sneha Patel"],
    subjects: ["Cyber Law", "Digital Privacy", "Data Protection"],
    description: ["Analysis of cyber laws and digital privacy regulations in India, including recent developments."],
    date: "2023-11-20",
    type: "article",
    format: ["PDF"],
    url: "https://example.com/cyber-law",
    language: ["English"],
    rights: ["Open Access"],
    setSpec: ["criminal"]
  },
  {
    id: "9",
    title: "Alternative Dispute Resolution in India",
    authors: ["Prof. Deepak Sharma"],
    subjects: ["ADR", "Mediation", "Arbitration"],
    description: ["Comprehensive guide to alternative dispute resolution mechanisms in India."],
    date: "2023-03-30",
    type: "book",
    format: ["PDF", "EPUB"],
    url: "https://example.com/adr-india",
    language: ["English"],
    rights: ["Creative Commons"],
    setSpec: ["commercial"]
  }
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const pageSize = parseInt(searchParams.get("pageSize") || "10")
    const query = searchParams.get("q") || ""
    const type = searchParams.get("type") || "all"
    const subject = searchParams.get("subject") || "all"

    // Build the where clause for filtering
    const where: any = {}

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { authors: { hasSome: [query] } },
        { subjects: { hasSome: [query] } }
      ]
    }

    if (type !== "all") {
      where.type = { equals: type, mode: 'insensitive' }
    }

    if (subject !== "all") {
      where.subjects = { hasSome: [subject] }
    }

    // Get total count for pagination
    const total = await prisma.libraryResource.count({ where })

    // Fetch paginated results
    const resources = await prisma.libraryResource.findMany({
      where,
      orderBy: { date: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return NextResponse.json({
      resources,
      total,
      page,
      pageSize,
      hasMore: (page * pageSize) < total
    })

  } catch (error: any) {
    console.error("Library API Error:", {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    })
    
    return NextResponse.json(
      { 
        error: "Failed to fetch library resources",
        details: error?.message || 'An unknown error occurred'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 