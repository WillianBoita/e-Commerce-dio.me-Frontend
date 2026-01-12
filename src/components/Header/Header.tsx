import Link from "next/link";
import './header.css'

export default function Header() {
  return (
    <header className="header">
      <h1>Dio Shopping</h1>
      <div className="link-area">
        <Link className="header-link" href='/'>Home</Link>
      </div>
    </header>
  )
}
