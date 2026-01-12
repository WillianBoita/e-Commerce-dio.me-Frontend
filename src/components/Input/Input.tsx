import './input.css'

interface InputProps {
  id: string,
  label: string,
  type?: React.HTMLInputTypeAttribute,
  onChange: (e: string) => void
}

export default function Input({id, label, type, onChange}: InputProps) {

  return (
    <div className="input-box">
      <label className='input-label' htmlFor={id}>{label}</label>
      <input className="input" id={id} type={type} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
