import { thumbnailResolution } from "@/data/data"
import { Heading, HStack, Box, FileUpload, Icon, Button, Stack, Input, NativeSelect, Field } from "@chakra-ui/react"
import { useState } from "react"
import { LuUpload } from "react-icons/lu"


export const ThumbnailGen = () => {
    const [thumbnail, setThumbnail] = useState(
        {
            resolution: "",
            timestamp: "00.03",
            videoFile: ""
        }
    )
    const generateThumbnail = async () => {
        const { resolution, timestamp, videoFile } = thumbnail
        if (!resolution || !timestamp || !videoFile) {
            return "Missing fields"
        }
        try {
            const formData = new FormData()
            for (let name in thumbnail) {
                formData.append(`${name}`, thumbnail[`${name}`])
            }
            const res = await fetch("", {
                method: "POST",
                headers: "content-type/multiform"
            })
            const results = res.json()
            console.log(results)
        } catch (error) {
            console.log(error)
        } finally {
            console.log("completed")
        }
    }
    const inputChange = (e) => {
        let { value, name } = e.target
        setThumbnail({ ...thumbnail, [name]: value });
    }
    const fileHandler = (file) => {
        setThumbnail({ ...thumbnail, videoFile: file.acceptedFiles[0] });
    }
    return (
        <HStack flexDirection={"column"} justifyContent={"space-between"} p={"3"} gap={"9"}>
            <Heading textAlign={"center"} fontSize={"2xl"} p={"3"} rounded={"xl"} fontWeight="bold">Thubnail Generator</Heading>
            <Stack>
                <FileUpload.Root maxW="sm" alignItems="stretch" accept={"video/*"} maxFiles={10} onFileChange={fileHandler}>
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
            </Stack>
            <Stack direction="row" gap="4" align="center">
                <Field.Root >
                    <Field.Label>Timestamp</Field.Label>
                    <Input onChange={inputChange} name={`timestamp`} size={"sm"} placeholder="Enter Timestamp..." variant="subtle" />
                </Field.Root>
                <Field.Root >
                    <Field.Label>Choose Resolution</Field.Label>
                    <NativeSelect.Root size={"sm"} key={"subtle"} variant={"subtle"} >
                        <NativeSelect.Field defaultValue={'1080×1350'} name={`resolution`} placeholder={`Instagram (1080×1350)`} onChange={inputChange}>
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
            <Stack direction="row" gap="4" align="center">
                <Button loadingText="Generating..." onClick={generateThumbnail} >Generate Thumbnail</Button>
                <Button loadingText="Downloading...">
                    Download Thumbnail
                </Button>
            </Stack>
        </HStack>
    )
} 