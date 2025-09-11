import { backendURL } from "@/apis/config"
import { thumbnailResolution } from "@/data/data"
import { Heading, HStack, Box, FileUpload, Icon, Button, Stack, Input, NativeSelect, Field, DownloadTrigger } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { LuUpload } from "react-icons/lu"
import { toaster } from "@/components/ui/toaster"
import { PreviewButton } from "./previewImg"


export const ThumbnailGen = () => {
    const [thumbnail, setThumbnail] = useState(
        {
            resolution: "",
            timestamp: "3",
            videoFile: ""
        }
    )
    const [previewImg, setPreviewImg] = useState(
        {
            isPreview: false,
            img: ""
        }
    )

    const generateThumbnail = async (e) => {
        e.preventDefault()
        const { resolution, timestamp, videoFile } = thumbnail
        if (!resolution || !timestamp || !videoFile) {
            toaster.create({
                description: "Missing field",
                type: "error",
                closable: true,
                duration: 1
            })
            return
        }
        try {
            const formData = new FormData()
            for (let name in thumbnail) {
                formData.append(name, thumbnail[name])
            }
            const res = await fetch(`${backendURL}/thumbnail-generator`, {
                method: "POST",
                body: formData,
            })
            const results = await res.json()
            toaster.create({
                description: results.message || "Thumbnail generated!",
                type: "info",
                closable: true,
            })
            console.log(backendURL + results.imgPath)
            setPreviewImg({ ...previewImg, img: results.imgPath })
        } catch (error) {
            toaster.create({
                description: error.message || "Something went wrong!",
                type: "error",
                closable: true,
            })
            console.error(error)
        } finally {
            setPreviewImg({ ...previewImg, isPreview: true })
        }
    }
    const inputChange = (e) => {
        let { value, name } = e.target
        setThumbnail({ ...thumbnail, [name]: value });
    }
    const fileHandler = (file) => {
        setThumbnail({ ...thumbnail, videoFile: file.acceptedFiles[0] });
    }
    useEffect(() => {
        console.log(previewImg)
    }, [previewImg])
    return (
        <HStack width={"100vw"} flexDirection={"column"} display={"flex"} height={"vh"} padding={"0 30px"} gap={"9"}>
            <Heading borderBottom={"1px solid grey"} textAlign={"center"} fontSize={"2xl"} p={"3"} rounded={"xl"} fontWeight="bold">Video Thubnail Generator</Heading>
            <FileUpload.Root alignItems="stretch" accept={"video/*"} maxFiles={10} onFileChange={fileHandler}>
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone>
                    <Icon size="md" color="fg.muted">
                        <LuUpload />
                    </Icon>
                    <FileUpload.DropzoneContent>
                        <Box>Drag and drop files here</Box>
                        <Box color="fg.muted">upload video only to generate thumbnail.</Box>
                    </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List showSize clearable={true} />
            </FileUpload.Root>
            <Stack direction="row" gap="4" >
                <Field.Root >
                    <Field.Label>Timestamp</Field.Label>
                    <Input onChange={inputChange} name={`timestamp`} size={"sm"} placeholder="Enter Timestamp..." variant="subtle" />
                </Field.Root>
                <Field.Root >
                    <Field.Label>Choose Resolution</Field.Label>
                    <NativeSelect.Root size={"sm"} variant={"subtle"}  >
                        <NativeSelect.Field name={`resolution`} placeholder={`choose resolution`} onChange={inputChange}>
                            {
                                thumbnailResolution.map((_) => {
                                    return <option key={_.for} value={_.resolution}>{_.for} ({_.resolution})</option>
                                })
                            }
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                    </NativeSelect.Root>
                </Field.Root>
            </Stack>
            <PreviewButton imgURL={`${backendURL + previewImg.img}`} />
            <Stack direction="row" gap={"3"} >
                <Button loadingText="Generating..." onClick={generateThumbnail} >Generate Thumbnail</Button>
                <DownloadTrigger
                    fileName="sample.txt"
                    mimeType="text/plain"
                    asChild
                >
                    <Button loadingText="Downloading..." >Download Thumbnail</Button>
                </DownloadTrigger>
            </Stack>
        </HStack>
    )
} 