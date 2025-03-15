import { toast } from "react-hot-toast";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface ToastOptions {
    title: string;
}

const customToast = {
    success: ({ title }: ToastOptions) => {
        toast.custom((t) => (
            <div
                className={`w-max bg-green-100 text-green-800 rounded-full pointer-events-auto flex ${
                    t.visible ? "animate-enter" : "animate-leave"
                }`}>
                <div className="py-2 px-3">
                    <div className="flex items-center w-full">
                        <CheckCircle2 className="h-4 w-4 text-doow_primary" aria-hidden="true" />
                        <div className="ml-2 grow">
                            <p className="text-base font-medium">{title}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    },
    warning: ({ title }: ToastOptions) => {
        toast.custom((t) => (
            <div
                className={`w-max bg-yellow-100 text-yellow-800 rounded-full pointer-events-auto flex ${
                    t.visible ? "animate-enter" : "animate-leave"
                }`}>
                <div className="py-2 px-3">
                    <div className="flex items-center w-full">
                        <AlertCircle className="h-4 w-4 text-yellow-500" aria-hidden="true" />
                        <div className="ml-2 grow">
                            <p className="text-base font-medium">{title}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    },
    error: ({ title }: ToastOptions) => {
        toast.custom((t) => (
            <div
                className={`w-max bg-red-100 text-red-800 rounded-full pointer-events-auto flex ${
                    t.visible ? "animate-enter" : "animate-leave"
                }`}>
                <div className="py-2 px-3">
                    <div className="flex items-center w-full">
                        <XCircle className="h-4 w-4 text-red-500" aria-hidden="true" />
                        <div className="ml-2 grow">
                            <p className="text-base font-medium">{title}</p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    }
};

export default customToast;