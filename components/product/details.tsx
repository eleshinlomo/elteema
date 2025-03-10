import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"
  

  const Details = ()=>{

  return (
  <div>
    <Dialog>
  <DialogTrigger><button className=" rounded-2xl font-extrabold text-green-800 px-2">Details</button></DialogTrigger>
  <DialogContent className="bg-green-900 text-white text-center flex flex-col justify-center items-center">
    <DialogHeader>
      <DialogTitle className="py-8"> More Info</DialogTitle>
      <DialogDescription>
        This feature is currently not available.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
</div>
)
  }

  export default Details
