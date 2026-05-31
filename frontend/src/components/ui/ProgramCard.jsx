import { FiEdit2, FiTrash2, FiCalendar, FiMapPin, FiUser, FiUsers } from 'react-icons/fi';

const ProgramCard = ({ p, isFarmer, isAdmin, canEdit, onEnroll, onEdit, onDelete, onToggle, today }) => {
  const isFull = p.maxParticipants && p.currentParticipants >= p.maxParticipants;
  const isUpcoming = p.startDate >= today;
  const isPast = p.startDate < today;

  return (
    <div className={`card flex flex-col hover:shadow-md transition-shadow ${!p.active ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex flex-wrap gap-1.5">
          {p.topic && <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded-full">{p.topic}</span>}
          {isUpcoming && p.active && <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Upcoming</span>}
          {isPast && <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">Past</span>}
          {!p.active && <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">Inactive</span>}
        </div>
        {canEdit && (
          <div className="flex gap-1 ml-auto shrink-0">
            <button onClick={() => onEdit(p)} className="p-1 text-gray-400 hover:text-blue-600 transition"><FiEdit2 size={13} /></button>
            {isAdmin && <button onClick={() => onDelete(p.id)} className="p-1 text-gray-400 hover:text-red-600 transition"><FiTrash2 size={13} /></button>}
          </div>
        )}
      </div>

      <h3 className="font-semibold text-gray-800 mb-1 leading-snug">{p.title}</h3>
      <p className="text-sm text-gray-500 mb-3 flex-1 line-clamp-2">{p.description}</p>

      <div className="space-y-1 text-xs text-gray-500 mb-3">
        <p className="flex items-center gap-1.5"><FiCalendar size={11} /> {p.startDate}{p.endDate ? ` — ${p.endDate}` : ''}</p>
        {p.venue && <p className="flex items-center gap-1.5"><FiMapPin size={11} /> {p.venue}</p>}
        {p.trainerName && <p className="flex items-center gap-1.5"><FiUser size={11} /> {p.trainerName}</p>}
        {p.registrationDeadline && <p className="text-orange-500">Register by: {p.registrationDeadline}</p>}
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <FiUsers size={11} />
          <span>{p.currentParticipants}/{p.maxParticipants || '∞'}</span>
          {isFull && <span className="text-red-500 font-medium">(Full)</span>}
        </div>
        <div className="flex gap-1.5">
          {canEdit && (
            <button onClick={() => onToggle(p.id)}
              className={`text-xs px-2 py-1 rounded font-medium transition ${p.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
              {p.active ? 'Deactivate' : 'Activate'}
            </button>
          )}
          {isFarmer && p.active && !isFull && isUpcoming && (
            <button onClick={() => onEnroll(p.id)}
              className="text-xs px-3 py-1 rounded font-semibold bg-green-600 hover:bg-green-700 text-white transition">
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProgramCard;