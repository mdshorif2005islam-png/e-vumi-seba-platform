import { Suspense } from 'react'
import NewApplicationForm from './form'
export default function NewApplicationPage(){return <Suspense fallback={<div className="card" style={{padding:24}}>লোড হচ্ছে...</div>}><NewApplicationForm/></Suspense>}
