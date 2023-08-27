"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Code, Music, VideoIcon, ImageIcon, ArrowRight, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation";

const tools = [
    {
        label: "Conversation",
        icon: MessageSquare,
        color: "text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/conversation"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        color: "text-rose-600",
        bgColor: "bg-rose-500/10",
        href: "/image"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        color: "text-teal-400",
        bgColor: "bg-teal-400/10",
        href: "/video"
    },
    {
        label: "Music Generation",
        icon: Music,
        color: "text-orange-600",
        bgColor: "bg-orange-500/10",
        href: "/music"
    },
    {
        label: "Code Generation",
        icon: Code,
        color: "text-lime-600",
        bgColor: "bg-lime-500/10",
        href: "/code"
    },
]

const DashboardPage = () => {
    const router = useRouter()
    return (
        <div>
            <div className="mb-8 space-y4">
                <h2 className="test-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="test-muted-foreground font-light text-sm md:text-lg text-center">
                    Chat with the smartest AI- Experience the power of AI</p>
            </div>
            <div className="px-4 md:px-20 lg:px32 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 border-black/5 flex items-center 
                    justify-between hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("w-8 h-8", tool.color)} />
                            </div>
                            <div className="font-semibold">
                                {tool.label}
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5" />

                    </Card>
                ))}
            </div>
        </div>
    );
}
export default DashboardPage;