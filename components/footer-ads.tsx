import { Card, CardContent } from "@/components/ui/card"

// Advertisement Component for Footer
function AdSpace({ title, size = "small" }: { title: string; size?: "small" | "medium" }) {
  const sizeClasses = {
    small: "h-24",
    medium: "h-32",
  }

  return (
    <Card
      className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 ${sizeClasses[size]}`}
    >
      <CardContent className="p-3 flex flex-col items-center justify-center h-full">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Advertisement</div>
        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 text-center">{title}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {size === "small" ? "250 x 100" : "300 x 150"}
        </div>
      </CardContent>
    </Card>
  )
}

export function FooterAds() {
  const adTitles = [
    "Legal Books & Resources",
    "Law School Courses",
    "Career Services",
    "Legal Software",
    "Internship Programs",
    "Bar Exam Preparation",
    "Legal Research Tools",
    "Professional Development",
    "Law Firm Services",
    "Legal Consulting",
    "Study Materials",
    "Legal Technology",
    "Court Filing Services",
    "Legal Writing Tools",
    "Paralegal Training",
    "Legal Analytics",
  ]

  return (
    <section className="py-8 px-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Sponsored Content</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Discover legal resources and services from our trusted partners
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {adTitles.map((title, index) => (
            <AdSpace key={index} title={title} size={index % 3 === 0 ? "medium" : "small"} />
          ))}
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Interested in advertising with us?{" "}
            <a href="mailto:ads@thelawhub.com" className="text-gold-600 dark:text-gold-400 hover:underline">
              Contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
