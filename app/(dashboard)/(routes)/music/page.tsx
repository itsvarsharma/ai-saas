"use client";

import * as z from "zod";
import axios from "axios";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { useProModel } from "@/hooks/use-pro-model";

const MusicPage = () => {
    const ProModel=useProModel();
    const router = useRouter();

    const [music, setMusic] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);

            const response = await axios.post('/api/music', values);
            setMusic(response.data.audio);
            form.reset();
        } catch (error: any) {
            if(error?.response?.status === 403){
                ProModel.onOpen();
            }
            // console.log(error);
        } finally {
            router.refresh();
        }
    }
    return (
        <div>
            <Heading
                title="Music Generator"
                description="Our most advanced music generator model."
                icon={Music}
                iconColor="text-orange-500"
                bgColor="bg-orange-500/10"
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
                                            placeholder="Piano solo"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2 w-full bg-orange-600 hover:bg-orange-500" disabled={isLoading}>
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
                {!music && !isLoading && (
                    <div>
                        <Empty label="No data to show!" src="/no-data.png" />
                    </div>
                )}
                {music && (
                    <audio controls className="w-full mt-8">
                        <source src={music} />
                    </audio>
                )}
            </div>
        </div>
    );
}
export default MusicPage;