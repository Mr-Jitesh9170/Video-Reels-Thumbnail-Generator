import { Image, Button, Dialog, Portal, createOverlay } from "@chakra-ui/react"

const dialog = createOverlay((props) => {
    const { imgURL, ...rest } = props
    return (
        <Dialog.Root {...rest} size={"cover"}>
            <Portal> 
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Preview Images</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body spaceY="4">
                            <Image
                                src={imgURL}
                                alt="Naruto vs Sasuke" 
                            />
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
})

export const PreviewButton = ({ imgURL }) => {
    return (
        <>
            <Button
            width={"100%"}
                onClick={() => {
                    dialog.open("a", { imgURL })
                }}
            >
               Preview Thumbnail
            </Button>
            <dialog.Viewport />
        </>
    )
}
