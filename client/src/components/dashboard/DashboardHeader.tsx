import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

interface DashboardHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onCreateNew: (name: string) => void
}

export const DashboardHeader = ({
  searchQuery,
  onSearchChange,
  onCreateNew,
}: DashboardHeaderProps) => {
  const [open, setOpen] = useState(false)
  const [boardName, setBoardName] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // ✅ Close popup when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const create = () => {
  console.log("CREATE CLICKED, name =", boardName)
  onCreateNew(boardName)
  setBoardName("")
  setOpen(false)
}

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                S
              </span>
            </div>
            <span className="font-display font-bold text-xl">
              Sketchflow
            </span>
          </Link>

          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search boards..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div ref={containerRef} className="relative">
          <Button onClick={() => setOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            New Board
          </Button>

          {open && (
            <div
              className="absolute right-0 mt-2 w-64 rounded-lg border bg-card shadow-lg p-4"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Input
                autoFocus
                placeholder="Board name"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    create()
                  }
                }}
              />

              <div className="flex justify-end gap-2 mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  disabled={!boardName.trim()}
                  onClick={create}
                >
                  Create
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
