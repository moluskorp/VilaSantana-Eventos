import {Avatar, Content, Logo, Nav} from './Header';

import logoImg from '../../assets/m.svg'
import profileImg from '../../assets/profile.jpg';


export function Header() {
   return(
       <Nav>
           <Content>
                <Logo src={logoImg} alt="Moltech"/>
                <Avatar />
           </Content>
       </Nav>
   );
}