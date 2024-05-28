'use client'

import { useSearchParams } from 'next/navigation';
import React from 'react'

function page() {
    const searchParams = useSearchParams();
    const location = searchParams.get('location')
    return (
        <div>
            {location}
        </div>
    )
}

export default page
