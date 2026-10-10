import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

function Calificacion({ valor, className}: {valor: number; className?: string}) {


    const nota = valor.toFixed(1)
    
    const color = valor>= 7 ? 'text-emerald-400' : valor >= 5 ? 'text-crispeta' : 'text-primary'


    return (
        <span className={cn('inline-flex items-center gap-1 text-sm font-semibold tabular-nums', color, className)} title="">
            <Star className="size-4 fill-current"/>
            {nota}
        </span>
      );
}

export default Calificacion;