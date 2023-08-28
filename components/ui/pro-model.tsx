"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModel } from "@/hooks/use-pro-model";
import { Badge } from "./badge";
import { Code, Music, VideoIcon, ImageIcon, MessageSquare, Check, Zap } from "lucide-react"
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-rose-600",
        bgColor: "bg-rose-500/10",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-teal-400",
        bgColor: "bg-teal-400/10",
    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-orange-600",
        bgColor: "bg-orange-500/10",
    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-lime-600",
        bgColor: "bg-lime-500/10",
    },
]

export const ProModel = () => {
    const proModel = useProModel();
    return (
        <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">
                            Upgrade to Genius
                            <Badge className="uppercase text-sm py-1" variant="premium">
                                pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-800 font-medium">
                        {tools.map((tool)=>(
                            <Card 
                            key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6",tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                    size="lg"
                    variant="premium"
                    className="w-full"
                    >
                        Upgrade <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}