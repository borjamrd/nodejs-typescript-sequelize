import { Note } from "../models/Note";

interface INoteRepo {
  save(note: Note): Promise<void>;
  update(note: Note): Promise<void>;
  delete(noteId: number): Promise<void>;
  retrieveById(noteId: number): Promise<Note>;
  retrieveAll(): Promise<Note[]>;
}

export class NoteRepo implements INoteRepo {
  async save(note: Note): Promise<void> {
    try {
      await Note.create({
        name: note.name,
        description: note.description,
      });
    } catch (error) {
      throw new Error("Failed to create note");
    }
  }

  async update(note: Note): Promise<void> {
    try {
      const newNote = await Note.findOne({
        where: {
          id: note.id,
        },
      });
      if (!newNote) {
        throw new Error("Note not found");
      }
      newNote.name = note.name;
      newNote.description = note.description;
      await newNote.save();
    } catch (error) {
      throw new Error("Failed to update note!");
    }
  }

  async delete(noteId: number): Promise<void> {
    try {
      const newNote = Note.findOne({
        where: {
          id: noteId,
        },
      });

      if (!newNote) {
        throw new Error("Note not found");
      }
    } catch (error) {
      throw new Error("Failed to delete note!");
    }
  }
  async retrieveById(noteId: number): Promise<Note> {
    try {
      const newNote = Note.findOne({
        where: { id: noteId },
      });
      if (!newNote) {
        throw new Error("Note fot found");
      }

      return newNote;
    } catch (error) {
      throw new Error("Failed to find note by id");
    }
  }
  async retrieveAll(): Promise<Note[]> {
    try {
      return await Note.findAll();
    } catch (error) {
      throw new Error("Failed to create note!");
    }
  }
}
