"use client";

import * as z from "zod";
import axios from "axios";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModel } from "@/hooks/use-pro-model";

const VideoPage = () => {
    const ProModel= useProModel();
    const router = useRouter();

    const [video, setVideo] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined);

            const response = await axios.post('/api/video', values);
            setVideo(response.data[0]);
            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403){
                ProModel.onOpen();
            }
            console.log(error);
        } finally {
            router.refresh();
        }
    }
    return (
        <div>
            <Heading
                title="Video Generator"
                description="Our most advanced video generator model."
                icon={Video}
                iconColor="text-teal-500"
                bgColor="bg-teal-500/10"
            />
            <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="rounded-lg 
                        border 
                        w-full 
                        p-4 
                        px-3 
                        md:px-6 
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2">
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Time-lapse of stars dancing in the night sky"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full bg-teal-600 hover:bg-teal-500" disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-center justify-center">
                        <Loader />
                    </div>
                )}
                {!video && !isLoading && (
                    <div>
                        <Empty label="No video to show!" src="/no-data.png" />
                    </div>
                )}
                {video && (
                    <video controls className="m-2 mt-8 aspect-video md:col-span-8 lg:col-span-8 rounded-lg border bg-black">
                        <source src={video} />
                    </video>
                )}
            </div>
        </div>
    );
}
export default VideoPage;