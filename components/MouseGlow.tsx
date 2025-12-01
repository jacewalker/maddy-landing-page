'use client'

import { useEffect, useRef } from 'react'

export default function MouseGlow() {
    const glowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!glowRef.current) return

            const x = e.clientX
            const y = e.clientY

            glowRef.current.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(37, 99, 235, 0.35), transparent 80%)`
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <div
            ref={glowRef}
            className="pointer-events-none fixed inset-0 transition duration-200"
            style={{
                background: 'radial-gradient(600px at 50% 50%, rgba(37, 99, 235, 0.35), transparent 80%)',
                zIndex: 9999,
                mixBlendMode: 'screen',
            }}
        />
    )
}
