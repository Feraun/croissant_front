import { Result, Button } from "antd"

export default function SuccesfulResult( {onClose, title} ){
    return (
        <Result
                status="success"
                title={title}
                extra={[
                    <Button type="primary" key="close" onClick={onClose}>
                        Close
                    </Button>
                ]}
            />
    )
}