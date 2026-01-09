import { Excalidraw } from "@excalidraw/excalidraw"
import { useParams, useSearchParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { socket } from "../socket"

const Whiteboard = () => {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()

  const mode = searchParams.get("mode")
  const isReadOnly = mode === "view"

  const excalidrawAPI = useRef<any>(null)
  const isRemoteUpdate = useRef(false)
  const saveTimer = useRef<number | null>(null)

  const [board, setBoard] = useState<any>(null)


  useEffect(() => {
    if (!id) return

    fetch(`http://localhost:5000/api/boards/${id}`)
      .then((r) => r.json())
      .then(setBoard)
      .catch(console.error)

    socket.emit("join-board", id)

    socket.on("canvas-update", (payload) => {
      if (!excalidrawAPI.current) return

      isRemoteUpdate.current = true

      excalidrawAPI.current.updateScene({
        elements: payload.elements,
      })
    })

    return () => {
      socket.off("canvas-update")
    }
  }, [id])

  if (!board) {
    return <div className="p-4">Loading board…</div>
  }

 
  const onChange = (elements: any[], appState: any, files: any) => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false
      return
    }

    socket.emit("canvas-update", {
      boardId: id,
      payload: { elements },
    })

    if (saveTimer.current) clearTimeout(saveTimer.current)

    saveTimer.current = window.setTimeout(() => {
      fetch(`http://localhost:5000/api/boards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: { elements, appState, files },
        }),
      })
    }, 800)
  }

  const initialData = board.content ?? undefined
  const baseUrl = `${window.location.origin}/whiteboard/${id}`

  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 border-b px-4 flex items-center justify-between">
        <span className="font-semibold">
          {board.title}
          {isReadOnly && (
            <span className="ml-2 text-sm text-gray-500">(View only)</span>
          )}
        </span>

        <div className="flex gap-2">
          <button
            className="border px-2 py-1 rounded"
            onClick={() => {
              navigator.clipboard.writeText(`${baseUrl}?mode=view`)
              alert("View-only link copied")
            }}
          >
            Copy view link
          </button>

          <button
            className="border px-2 py-1 rounded"
            onClick={() => {
              navigator.clipboard.writeText(`${baseUrl}?mode=edit`)
              alert("Edit link copied")
            }}
          >
            Copy edit link
          </button>
        </div>
      </header>

      <div className="flex-1">
        <Excalidraw
          excalidrawAPI={(api) => (excalidrawAPI.current = api)}
          initialData={initialData}
          onChange={isReadOnly ? undefined : onChange}
          viewModeEnabled={isReadOnly}
        />
      </div>
    </div>
  )
}

export default Whiteboard
