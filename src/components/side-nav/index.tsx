import { Collapse } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SideNavConfig } from "../../__utils/sidenav-cofig";
import { hasViewPermission } from "../../__utils/authorization";
import { Link, SideNavConfigType } from "../../__utils/type";



const SideNav: React.FC = () => {

    const PanelContent = ({ navLink }: any) => {
        return <NavLink
            style={{ display: 'block' }}
            to={navLink.link}
        >
            {navLink.text}
        </NavLink>
    }

    return <CollapseWrapper>
        <CollapseWrapper>
            {SideNavConfig
                .filter((sideNav: SideNavConfigType) => hasViewPermission(sideNav.permission))
                .map((sideNav: SideNavConfigType) => {
                    return <CollapseWrapper.Panel
                        header={sideNav.title}>
                        {
                            sideNav.links
                                .filter((navLink: Link) => hasViewPermission(navLink.permission))
                                .map((navLink: Link) => {
                                    return <PanelContent navLink={navLink} />

                                })
                        }
                    </CollapseWrapper.Panel>
                })}
        </CollapseWrapper>
    </CollapseWrapper>
}


export default SideNav;


const CollapseWrapper = styled(Collapse as any)`
    width: 100%;
    height: 100%;
`