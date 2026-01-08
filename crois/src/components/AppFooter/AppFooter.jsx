import { Button, Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
import './AppFooter.css';

export default function AppFooter(){
    return (
        <>
            <Footer id="footerStyle">
                <div id="left_column">
                    <div id="down_div">
                        <Typography.Paragraph id="down_text">
                            Эко-стартап из Воронежа
                        </Typography.Paragraph>
                    </div>
                </div>
                <div id="right_column">
                    <div id="down_div">
                        <Typography.Paragraph id="down_text">
                            2026
                        </Typography.Paragraph>
                    </div>
                </div>
            </Footer>
        </>
    )
}