import { ReactNode, useState } from 'react';
import {
    ArrowDownIcon,
    ChildrenContainer,
    Header,
    Nav,
    TitleHeader,
} from './style';

interface AccordionProps {
    children: ReactNode;
}

export default function Accordion({ children }: AccordionProps) {
    const [open, setOpen] = useState(false);

    return (
        <Nav>
            <Header onClick={() => setOpen(!open)}>
                <TitleHeader>Produtos</TitleHeader>
                <ArrowDownIcon open={open} />
            </Header>
            <ChildrenContainer open={open}>
                {open && children}
            </ChildrenContainer>
        </Nav>
    );
}
