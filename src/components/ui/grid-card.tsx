"use client";

import { useMemo, useId } from 'react';
import { cn } from '@/lib/utils';
import { GridPattern } from '@/components/ui/grid-pattern';

const DEFAULT_PATTERN: [x: number, y: number][] = [
        [8, 2], [9, 4], [7, 1], [10, 3], [8, 5]
];

export function GridCard({
        className,
        children,
        ...props
}: React.ComponentProps<'div'>) {
        const id = useId();
        const pattern = useMemo(() => {
                const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                return DEFAULT_PATTERN.map(([x, y], i) => [
                        7 + ((hash + i) % 4),
                        1 + ((hash + i * 2) % 6)
                ] as [number, number]);
        }, [id]);

        return (
                <div
                        className={cn(
                                'group bg-background relative isolate z-0 flex h-full flex-col justify-between overflow-hidden rounded-sm border px-5 py-4 transition-colors duration-75 cursor-pointer',
                                className,
                        )}
                        {...props}
                >
                        <div className="absolute inset-0">
                                <div className="absolute -inset-[25%] -skew-y-12 [mask-image:linear-gradient(225deg,black,transparent)]">
                                        <GridPattern
                                                width={30}
                                                height={30}
                                                x={0}
                                                y={0}
                                                squares={pattern}
                                                className="fill-border/50 stroke-border absolute inset-0 size-full translate-y-2 transition-transform duration-150 ease-out group-hover:translate-y-0"
                                        />
                                </div>
                                <div
                                        className={cn(
                                                'absolute -inset-[10%] opacity-0 blur-[50px] transition-opacity duration-150 group-hover:opacity-10',
                                                'bg-[conic-gradient(#F35066_0deg,#F35066_117deg,#9071F9_180deg,#5182FC_240deg,#F35066_360deg)]',
                                        )}
                                />
                        </div>
                        {children}
                </div>
        );
}
