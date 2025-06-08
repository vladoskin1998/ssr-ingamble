
import Link from 'next/link'
import '../../styles/not-found.css'
import Image from 'next/image'
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Not Found",
  description: "Not Found",
};

export default function NotFound() {

    return (
        <div className="not--found">
            <div className="not--found-img">
                <Image width={620} height={320} src='/img/not-found/not-found.png' alt="not found 404" />
            </div>
            <h3 className="not--found-title">Oops! Something went wrong!</h3>
            <h5 className="not--found-subtitle">{'The link you followed may be broken, or this page have been removed:('}</h5>
            <Link href="/">
                <button className="not--found-button">Back To Home</button>
            </Link>
        </div>
    )
}
