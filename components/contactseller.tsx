import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "./ui/button"
  

  const ContactSeller = ()=>{

  return (
  <div>
    <Dialog>
  <DialogTrigger><button className=" rounded-2xl text-green-500 px-2">Contact Seller</button></DialogTrigger>
  <DialogContent className="bg-green-900 text-white text-center flex flex-col justify-center items-center">
    <DialogHeader>
      <DialogTitle className="py-8"> Send a message to the Seller</DialogTitle>
      <DialogDescription>
        This feature is currently not available.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
)
  }

  export default ContactSeller
