'use client'

import { motion } from 'motion/react'
import { Plus, ArrowUp } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useHeroChat } from '../hooks/use-hero-chat'
import { HERO_INPUT_PLACEHOLDER } from '../constants'
import { useReducedMotion } from '@/shared/hooks/use-reduced-motion'

export function HeroChatInput() {
    const {
        value,
        handleChange,
        handleKeyDown,
        handleSubmit,
        isLoading,
        textareaRef,
        isEmpty,
    } = useHeroChat()
    const isReducedMotion = useReducedMotion()

    return (
        <motion.div
            initial={isReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="w-full max-w-2xl mx-auto px-4 sm:px-0"
        >
            <div className="group relative rounded-2xl bg-surface/95 border border-border p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md">
                {/* Textarea Input */}
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder={HERO_INPUT_PLACEHOLDER}
                    className="w-full min-h-[80px] max-h-[200px] resize-none bg-transparent border-0 p-0 text-text-primary placeholder:text-text-muted focus:ring-0 leading-relaxed text-base outline-none"
                />

                {/* Bottom Bar */}
                <div className="mt-3 flex items-center justify-between">
                    {/* Attachment Button */}
                    <button
                        type="button"
                        onClick={() => { }}
                        aria-label="Attach file"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary focus:outline-none"
                    >
                        <Plus size={18} />
                    </button>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isEmpty || isLoading}
                        className={cn(
                            "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 focus:outline-none",
                            isEmpty || isLoading
                                ? "bg-accent/40 cursor-not-allowed"
                                : "bg-accent text-white hover:brightness-110 hover:scale-105 active:scale-95"
                        )}
                    >
                        <ArrowUp
                            size={16}
                            className={cn("transition-transform", isLoading && "animate-pulse")}
                        />
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
