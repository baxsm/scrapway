import { FC, ReactNode } from 'react'

interface NodeInputsProps {
  children: ReactNode
}

const NodeInputs: FC<NodeInputsProps> = ({children}) => {
  return (
    <div className='flex flex-col divide-y gap-2'>
        {children}
    </div>
  )
}

export default NodeInputs