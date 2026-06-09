import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import NoteItem from './components/NoteItem'
import type { Note } from './components/NoteItem'
import { useTheme } from './context/useTheme'

const initialNotes: Note[] = [
  {
    id: 1,
    title: 'Първа бележка',
    content: 'Добави, редактирай или изтрий бележки от runtime масива.',
  },
]

function App() {
  const { theme, toggleTheme } = useTheme()
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleCreateNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle && !trimmedContent) {
      return
    }

    const newNote: Note = {
      id: Date.now(),
      title: trimmedTitle || 'Без заглавие',
      content: trimmedContent,
    }

    setNotes((currentNotes) => [newNote, ...currentNotes])
    setTitle('')
    setContent('')
  }

  const handleDeleteNote = (id: number) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id))
  }

  const handleUpdateNote = (id: number, updatedNote: Omit<Note, 'id'>) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id ? { ...note, ...updatedNote } : note,
      ),
    )
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">AI generated</p>
          <h1>Todo list</h1>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? 'Тъмна тема' : 'Светла тема'}
        </button>
      </header>

      <section className="workspace">
        <form className="note-form" onSubmit={handleCreateNote}>
          <h2>Нова бележка</h2>
          <label>
            Заглавие
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Например: Домашни задачи"
            />
          </label>
          <label>
            Описание
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Напиши съдържанието тук"
              rows={6}
            />
          </label>
          <button type="submit" className="primary-button">
            Добави бележка
          </button>
        </form>

        <section className="notes-section" aria-label="Списък с бележки">
          <div className="notes-header">
            <h2>Бележки</h2>
            <span>{notes.length}</span>
          </div>

          {notes.length > 0 ? (
            <div className="notes-list">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onUpdate={handleUpdateNote}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              Все още няма бележки. Добави първата от формата.
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

export default App
