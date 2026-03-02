'use client'

import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2 } from 'lucide-react'
import { StepId } from '../types'

interface StepDemoPreviewProps {
    activeStep: StepId
}

export function StepDemoPreview({ activeStep }: StepDemoPreviewProps) {
    return (
        <div className="relative h-96 w-full max-w-2xl rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full"
                >
                    {renderPreviewContent(activeStep)}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function renderPreviewContent(stepId: StepId) {
    switch (stepId) {
        case 0:
            return (
                <div className="h-full w-full bg-slate-950 p-6 font-mono">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-primary" />
                            </div>
                            <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-slate-800 p-4 text-sm text-slate-100 leading-relaxed shadow-lg">
                                I run a yoga studio. I offer classes, private sessions, and sell wellness products online.
                            </div>
                        </div>
                        <div className="flex items-center gap-3 self-end">
                            <div className="text-xs text-slate-400">AI thinking...</div>
                            <div className="flex gap-1.5">
                                {[0, 1, 2].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                                        className="h-2 w-2 rounded-full bg-primary"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 1:
            return (
                <div className="h-full w-full grid grid-cols-2">
                    <div className="p-6 flex flex-col gap-3 border-r border-border">
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Build Log</h4>
                        {[
                            'Homepage with class schedule',
                            'Online booking system',
                            'E-commerce for products',
                            'Payment integration',
                            'Student admin panel',
                        ].map((task, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-muted-foreground">{task}</span>
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-xs">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="h-3.5 w-3.5 rounded-full border-2 border-primary border-t-transparent"
                            />
                            <span className="font-medium">Deploying to AWS...</span>
                        </div>
                    </div>
                    <div className="bg-slate-900 p-6 flex flex-col gap-2 overflow-hidden">
                        <div className="text-[10px] font-mono text-emerald-400/80">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 0.4] }}
                                    transition={{ delay: i * 0.1, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    {`> const ${['app', 'api', 'db', 'auth'][i % 4]} = initModule('${['main', 'services', 'store', 'provider'][i % 4]}')`}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-muted">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="h-full w-full flex flex-col overflow-hidden">
                    {/* Mini Website Preview */}
                    <div className="h-2/3 w-full bg-white dark:bg-slate-900 border-b border-border p-4 relative">
                        <div className="flex justify-between items-center mb-4">
                            <div className="h-4 w-20 bg-muted rounded" />
                            <div className="flex gap-2">
                                <div className="h-4 w-8 bg-muted rounded" />
                                <div className="h-4 w-8 bg-muted rounded" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <div className="h-8 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
                            <div className="h-4 w-60 bg-muted rounded mx-auto" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 px-8">
                            <div className="h-20 bg-muted rounded-xl" />
                            <div className="h-20 bg-muted rounded-xl" />
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter">yogastudio.com is live</span>
                        </div>
                    </div>
                    {/* Admin Panel Preview */}
                    <div className="h-1/3 w-full bg-muted/30 p-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recent Bookings</span>
                            <div className="h-3 w-10 bg-muted rounded" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            {[1, 2].map(i => (
                                <div key={i} className="flex items-center justify-between border-b border-border/50 py-1">
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 rounded bg-slate-300 dark:bg-slate-700" />
                                        <div className="h-2 w-20 bg-muted rounded" />
                                    </div>
                                    <div className="h-2 w-12 bg-muted rounded" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        default:
            return null
    }
}
