import { useState, useEffect, useRef } from "react"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
]

export function LanguageSwitcher() {
  const [language, setLanguage] = useState("en")
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  const currentLanguage = languages.find((lang) => lang.code === language)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-white text-sm px-3 py-2 rounded hover:bg-white/10 transition"
      >
        <Globe className="h-4 w-4 mr-2" />
        {currentLanguage?.nativeName}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-sm border-1 border-gray-100 z-50">
          {languages.map((lang) => (
            <div
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code)
                setOpen(false)
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                language === lang.code ? "bg-blue-50 font-semibold" : ""
              }`}
            >
              <span className="text-xs text-gray-500 ">{lang.nativeName}</span>
              <span className="text-xs text-gray-500 ml-2">({lang.name})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}