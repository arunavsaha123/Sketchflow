import { useState, useMemo, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { BoardCard, Board } from "@/components/dashboard/BoardCard"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    const navigate = useNavigate()

    const [boards, setBoards] = useState<Board[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeTab, setActiveTab] = useState("all")

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/boards")
                const data = await res.json()

                const formatted: Board[] = data.map((b: any) => ({
                    id: b._id,
                    title: b.title,
                    thumbnail: "",
                    lastEdited: "Just now",
                    collaborators: 1,
                    isFavorite: false,
                }))

                setBoards(formatted)
            } catch (err) {
                console.error("Failed to fetch boards", err)
            } finally {
                setLoading(false)
            }
        }

        fetchBoards()
    }, [])

    const filteredBoards = useMemo(() => {
        let result = boards

        if (searchQuery) {
            result = result.filter((board) =>
                board.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        if (activeTab === "favorites") {
            result = result.filter((board) => board.isFavorite)
        }

        if (activeTab === "recent") {
            result = result.slice(0, 4)
        }

        return result
    }, [boards, searchQuery, activeTab])

    const handleCreateNew = async (name: string) => {
        const title = name.trim() || "Untitled Board"

        const res = await fetch("http://localhost:5000/api/boards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                ownerId: "test-user",
            }),
        })

        const created = await res.json()

        const newBoard: Board = {
            id: created._id,
            title: created.title,
            thumbnail: "",
            lastEdited: "Just now",
            collaborators: 1,
            isFavorite: false,
        }

        setBoards((prev) => [newBoard, ...prev])
        navigate(`/whiteboard/${created._id}`)
    }

    const handleToggleFavorite = (id: string) => {
        setBoards((prev) =>
            prev.map((board) =>
                board.id === id
                    ? { ...board, isFavorite: !board.isFavorite }
                    : board
            )
        )
    }

    const handleDelete = async (id: string) => {
        await fetch(`http://localhost:5000/api/boards/${id}`, {
            method: "DELETE",
        })

        setBoards(prev => prev.filter(board => board.id !== id))
    }


    const handleDuplicate = (id: string) => {
        const boardToDuplicate = boards.find((b) => b.id === id)
        if (!boardToDuplicate) return

        const newBoard: Board = {
            ...boardToDuplicate,
            id: crypto.randomUUID(),
            title: `${boardToDuplicate.title} (Copy)`,
            lastEdited: "Just now",
            isFavorite: false,
        }

        setBoards((prev) => [newBoard, ...prev])
    }

    if (loading) {
        return <div className="p-6">Loading boards…</div>
    }

    return (
        <div className="min-h-screen bg-background">
            <DashboardHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onCreateNew={handleCreateNew}
            />

            <main className="container mx-auto px-6 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="font-display text-3xl font-bold mb-1">
                                Your Boards
                            </h1>
                            <p className="text-muted-foreground">
                                {boards.length} board{boards.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="recent">Recent</TabsTrigger>
                                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    {filteredBoards.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <AnimatePresence mode="popLayout">
                                {filteredBoards.map((board) => (
                                    <BoardCard
                                        key={board.id}
                                        board={board}
                                        onToggleFavorite={handleToggleFavorite}
                                        onDelete={handleDelete}
                                        onDuplicate={handleDuplicate}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <EmptyState onCreateNew={() => handleCreateNew("")} />
                    )}
                </motion.div>
            </main>
        </div>
    )
}

export default Dashboard
