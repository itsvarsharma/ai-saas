import Image from "next/image";

interface EmptyProps {
    label: string,
    src: string;
}
export const Empty = ({
    label,
    src
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-60 w-60">
                <Image alt="Empty"
                    fill
                    src={src} />
            </div>
            <p className="test-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    );
}