import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

interface Props {
  notes: Task["notes"];
}

export default function NotePanel({ notes }: Props) {
  return (
    <>
      <AddNoteForm />
      <div className="divide-y divide-gray-100 mt-10">
        {notes.length ? (
          <>
           <p className="font-bold text-2xl text-slate-600 my-5"> Notas: </p>
           {notes.map(note =>(
             <NoteDetail key={note._id} note={note}/>
           ))}
          </>
        ) : (
          <p className="text-center text-gray-500 pt-3">No hay notas aún</p>
        )}
      </div>
    </>
  );
}
