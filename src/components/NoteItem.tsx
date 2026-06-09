import { useState } from 'react'

export type Note = {
  id: number
  title: string
  content: string
}

type NoteItemProps = {
  note: Note
  onDelete: (id: number) => void
  onUpdate: (id: number, note: Omit<Note, 'id'>) => void
}

function NoteItem({ note, onDelete, onUpdate }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleSave = () => {
    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle && !trimmedContent) {
      return
    }

    onUpdate(note.id, {
      title: trimmedTitle || 'Без заглавие',
      content: trimmedContent,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTitle(note.title)
    setContent(note.content)
    setIsEditing(false)
  }

  return (
    <article className="note-card">
      {isEditing ? (
        <div className="note-edit-form">
          <label>
            Заглавие
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Напиши заглавие"
            />
          </label>
          <label>
            Бележка
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Напиши бележка"
              rows={4}
            />
          </label>
          <div className="note-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleCancel}
            >
              Отказ
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={handleSave}
            >
              Запази
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="note-content">
            <h2>{note.title}</h2>
            <p>{note.content || 'Няма добавен текст.'}</p>
          </div>
          <div className="note-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => setIsEditing(true)}
            >
              Редактирай
            </button>
            <button
              type="button"
              className="danger-button"
              onClick={() => onDelete(note.id)}
            >
              Изтрий
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default NoteItem
