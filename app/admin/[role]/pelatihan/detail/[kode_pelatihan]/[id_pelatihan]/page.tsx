'use client'

import DetailPelatihan from '@/components/dashboard/Dashboard/DetailPelatihan'
import DefaultLayout from '@/components/dashboard/Layouts/DefaultLayout'
import { usePathname } from 'next/navigation'
import React from 'react'

function page() {
    return (
        <>
            <DefaultLayout>
                <DetailPelatihan />
            </DefaultLayout>
        </>
    )
}

export default page
