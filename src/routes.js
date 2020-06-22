import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Community from "./views/nav1/Community";
import Building from "./views/nav1/Building";
import House from "./views/nav1/House";
import PropertyManagement from "./views/nav2/PropertyManagement";
import HouseMaintain from "./views/nav2/HouseMaintain";
import ApartmentDecor from "./views/nav2/ApartmentDecor";
import LeaseManagement from "./views/nav2/LeaseManagement";
import User from "./views/nav2/User";
import UserManagement from "./views/nav2/UserManagement";
import Complain from "./views/nav2/Complain";
import Utilities from "./views/nav3/Utilities";
import Deposit from "./views/nav3/Deposit";
import BillingRegistration from "./views/nav3/BillingRegistration";
import Billing from "./views/nav3/Billing";
import Arrearage from "./views/nav3/Arrearage";
import UserDeposit from "./views/nav4/UserDeposit";
import CostBreakdown from "./views/nav4/CostBreakdown";
import Collect from "./views/nav4/Collect";
import Greening from "./views/nav5/Greening";
import Clean from "./views/nav5/Clean";
import Facilities from "./views/nav5/Facilities";
import InternalSystems from "./views/nav6/InternalSystems";
import Personnel from "./views/nav6/Personnel";
import Corporate from "./views/nav6/Corporate";
import Office from "./views/nav6/Office";
import WorkSchedule from "./views/nav6/WorkSchedule";
import CommunityService from "./views/nav7/CommunityService";
import Security from "./views/nav7/Security";
import SecurityRecords from "./views/nav7/SecurityRecords";
import Pass from "./views/nav7/Pass";
import Fire from "./views/nav7/Fire";

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/main',
        component: Main,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '地产管理',
        iconCls: 'fa fa-building',//图标样式class
        children: [
            { path: '/community', component: Community, name: '楼盘资料' },
            { path: '/building', component: Building, name: '楼栋资料' },
            { path: '/house', component: House, name: '房屋资料' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '物业管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/propertymanagement', component: PropertyManagement, name: '物业管理制度' },
            { path: '/housemaintain', component: HouseMaintain, name: '房屋维修管理' },
            { path: '/housedecor', component: ApartmentDecor, name: '单元装修管理' },
            { path: '/leasemanagement', component: LeaseManagement, name: '租约管理' },
            { path: '/user', component: User, name: '业主档案' },
            { path: '/usermanagement', component: UserManagement, name: '业主委员会' },
            { path: '/complain', component: Complain, name: '客户投诉管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '物业收费',
        iconCls: 'fa fa-calculator',
        children: [
            { path: '/utilities', component: Utilities, name: '水电煤气抄表记录' },
            { path: '/deposit', component: Deposit, name: '押金记录' },
            { path: '/arrearage', component: Arrearage, name: '欠费催款报表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '信息查询',
        iconCls: 'fa fa-search',
        children: [
            { path: '/userdeposit', component: UserDeposit, name: '业主押金' },
            { path: '/costbreakdown', component: CostBreakdown, name: '费用缴纳明细' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '小区环境管理',
        iconCls: 'fa fa-camera-retro',
        children: [
            { path: '/greening', component: Greening, name: '绿化分布' },
            { path: '/clean', component: Clean, name: '清洁管理' },
            { path: '/facilities', component: Facilities, name: '设施管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '内部事务',
        iconCls: 'fa fa-envelope-open',
        children: [
            { path: '/internalsys', component: InternalSystems, name: '内部制度' },
            { path: '/personnel', component: Personnel, name: '人事档案' },
            { path: '/corporate', component: Corporate, name: '公司事务' },
            { path: '/workschedule', component: WorkSchedule, name: '工作安排' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '日常事务',
        iconCls: 'fa fa-envelope-open-o',
        children: [
            { path: '/communityservice', component: CommunityService, name: '社区服务' },
            { path: '/security', component: Security, name: '保安编班' },
            { path: '/pass', component: Pass, name: '出入证管理' },
            { path: '/fire', component: Fire, name: '消防巡查' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
