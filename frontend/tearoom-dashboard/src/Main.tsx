import { Grid, Drawer, List, ListItem, ListItemText, Typography, IconButton, Divider, Menu, Button, Modal, TextField, Select, MenuItem, Backdrop, Fade, Paper } from "@mui/material";
import { Menu as MenuIcon, Edit, Delete } from "@mui/icons-material";
import { useState, useEffect } from 'react';
import { setEmail, getEmail, setAuthenticated, getAuthenticated } from "./App";
import { useNavigate } from "react-router-dom";

enum Military {
    ASHIGARU = '足軽',
    CAVALRY = '騎馬',
    BOW = '弓',
    GUN = '鉄砲'
};

interface Busho {
    name: string;
    military: Military;
};

const bushos: Busho[] = [
    {
        name: '【第六天魔王】織田信長',
        military: Military.GUN
    },
    {
        name: '【野心の炎】明智光秀',
        military: Military.GUN
    },
    {
        name: '【毘沙門天】上杉謙信',
        military: Military.CAVALRY
    },
    {
        name: '【風林火山】武田信玄',
        military: Military.CAVALRY
    },
    {
        name: '【獅子奮迅】北条氏康',
        military: Military.ASHIGARU
    },
    {
        name: '【海道一】今川義元',
        military: Military.BOW
    },
    {
        name: '【謀神】毛利元就',
        military: Military.BOW
    },
    {
        name: '【東国無双】本多忠勝',
        military: Military.CAVALRY
    },
    {
        name: '【鬼島津】島津義弘',
        military: Military.GUN
    },
    {
        name: '【美濃の蝮】斎藤道三',
        military: Military.ASHIGARU
    },
    {
        name: '【鬼若子】長宗我部元親',
        military: Military.ASHIGARU
    },
    {
        name: '【銀の鯰尾】蒲生氏郷',
        military: Military.GUN
    },
    {
        name: '【抜刀歌仙】細川忠興',
        military: Military.GUN
    },
    {
        name: '【湖月光滲】ねね',
        military: Military.ASHIGARU
    },
    {
        name: '【奥州探題の威】伊達晴宗',
        military: Military.CAVALRY
    },
    {
        name: '【越後二天】柿崎景家',
        military: Military.CAVALRY
    },
    {
        name: '【鬼美濃】馬場信春',
        military: Military.CAVALRY
    },
    {
        name: '【逃げ弾正】高坂昌信',
        military: Military.CAVALRY
    },
    {
        name: '【禄寿応穏】北条氏政',
        military: Military.ASHIGARU
    },
    {
        name: '【女地頭】井伊直虎',
        military: Military.BOW
    },
    {
        name: '【三州総大将】島津義久',
        military: Military.GUN
    },
    {
        name: '【佳良の眼】仙桃院',
        military: Military.BOW
    },
    {
        name: '【西国の旗頭】毛利輝元',
        military: Military.BOW
    },
    {
        name: '【野望の幕開け】織田信長',
        military: Military.CAVALRY
    },
    {
        name: '【瓶割り】柴田勝家',
        military: Military.CAVALRY
    },
    {
        name: '【表裏比興】真田昌幸',
        military: Military.ASHIGARU
    },
    {
        name: '【天下之飾】真田信幸',
        military: Military.ASHIGARU
    },
    {
        name: '【連歌百韻】明智光秀',
        military: Military.ASHIGARU
    },
    {
        name: '【三階菅笠】佐々成政',
        military: Military.ASHIGARU
    },
    {
        name: '【天の時】直江兼続',
        military: Military.BOW
    },
    {
        name: '【上州の黄斑】長野業正',
        military: Military.ASHIGARU
    },
    {
        name: '【独眼竜】伊達政宗',
        military: Military.GUN
    },
    {
        name: '【智の小十郎】片倉小十郎',
        military: Military.GUN
    },
    {
        name: '【西国無双】立花宗茂',
        military: Military.BOW
    },
    {
        name: '【天資婉麗】立花誾千代',
        military: Military.CAVALRY
    },
    {
        name: '【颶風撩乱】風魔小太郎',
        military: Military.BOW
    },
    {
        name: '【窺見の巫】望月千代女',
        military: Military.BOW
    },
    {
        name: '【百万一心】毛利元就',
        military: Military.ASHIGARU
    },
    {
        name: '【天下の知】小早川隆景',
        military: Military.ASHIGARU
    }, 
    {
        name: '【軍神】上杉謙信',
        military: Military.BOW
    },
    {
        name: '【虎の後嗣】武田勝頼',
        military: Military.ASHIGARU
    },
    {
        name: '【武田之赤備】山県昌景',
        military: Military.CAVALRY
    },
    {
        name: '【老當益壮】朝倉宗滴',
        military: Military.CAVALRY
    },
    {
        name: '【率先垂範】蒲生氏郷',
        military: Military.GUN
    },
    {
        name: '【攻め弾正】真田幸隆',
        military: Military.BOW
    },
    {
        name: '【羽州の狐】最上義光',
        military: Military.ASHIGARU
    },
    {
        name: '【釣り野伏】島津家久',
        military: Military.GUN
    },
    {
        name: '【薩摩の英君】島津義久',
        military: Military.BOW
    },
    {
        name: '【薩摩の鬼神】島津義弘',
        military: Military.CAVALRY
    },
    {
        name: '【江北の夜叉】浅井長政',
        military: Military.BOW
    },
    {
        name: '【越後の鍾馗】斎藤朝信',
        military: Military.BOW
    },
    {
        name: '【押太鼓】馬場信春',
        military: Military.ASHIGARU
    },
    {
        name: '【尼御台】寿桂尼',
        military: Military.BOW
    },
    {
        name: '【冬夏青青】淀殿',
        military: Military.ASHIGARU
    },
    {
        name: '【一刀一閃】伊藤一刀斎',
        military: Military.ASHIGARU
    },
    {
        name: '【剣聖】上泉信綱',
        military: Military.ASHIGARU
    }
];

enum Prefectures {
    '北海道' = '北海道',
    '青森県' = '青森県',
    '岩手県' = '岩手県',
    '宮城県' = '宮城県',
    '秋田県' = '秋田県',
    '山形県' = '山形県',
    '福島県' = '福島県',
    '茨城県' = '茨城県',
    '栃木県' = '栃木県',
    '群馬県' = '群馬県',
    '埼玉県' = '埼玉県',
    '千葉県' = '千葉県',
    '東京都' = '東京都',
    '神奈川県' = '神奈川県',
    '山梨県' = '山梨県',
    '長野県' = '長野県',
    '新潟県' = '新潟県',
    '富山県' = '富山県',
    '石川県' = '石川県',
    '福井県' = '福井県',
    '岐阜県' = '岐阜県',
    '静岡県' = '静岡県',
    '愛知県' = '愛知県',
    '三重県' = '三重県',
    '滋賀県' = '滋賀県',
    '京都府' = '京都府',
    '大阪府' = '大阪府',
    '兵庫県' = '兵庫県',
    '奈良県' = '奈良県',
    '和歌山県' = '和歌山県',
    '鳥取県' = '鳥取県',
    '島根県' = '島根県',
    '岡山県' = '岡山県',
    '広島県' = '広島県',
    '山口県' = '山口県',
    '徳島県' = '徳島県',
    '香川県' = '香川県',
    '愛媛県' = '愛媛県',
    '高知県' = '高知県',
    '福岡県' = '福岡県',
    '佐賀県' = '佐賀県',
    '長崎県' = '長崎県',
    '熊本県' = '熊本県',
    '大分県' = '大分県',
    '宮崎県' = '宮崎県',
    '鹿児島県' = '鹿児島県',
    '沖縄県' = '沖縄県'
};

const prefecturesArray = Object.keys(Prefectures).map(key => Prefectures[key as keyof typeof Prefectures]);

enum Permissions {
    OWNER = 'OWNER', // all
    ADMIN = 'ADMIN', // all
    MODERATOR = 'MODERATOR', // can add others
    USER = 'USER' // only own settings
};

const PermissionsDescription = [
    {
        name: 'OWNER',
        value: Permissions.OWNER,
        description: '全ての権限'
    },
    {
        name: 'ADMIN',
        value: Permissions.ADMIN,
        description: '全ての権限'
    },
    {
        name: 'MODERATOR',
        value: Permissions.MODERATOR,
        description: 'ユーザーの管理のみ'
    },
    {
        name: 'USER',
        value: Permissions.USER,
        description: '権限なし'
    }
];

export default function Main() {
    const navigate = useNavigate();
    function signout(): void {
        navigate('/');
        setEmail(undefined);
        setAuthenticated(false);
    }

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 966);
    useEffect(() => {
        function handleResize(): void {
            setIsMobile(window.innerWidth < 768);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        update();
    }, []);

    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    function handleClose() {
        setIsMobileSidebarOpen(false);
    }

    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);

    function handleAccountMenuClose(): void {
        setIsAccountMenuOpen(false);
    }

    const [selected, setSelected] = useState('busho'); /* busho, prefecture, user_setting(mod+) */

    function onSidebarSelected(selected: string): void {
        setSelected(selected);
    }

    const [notifyBushos, setNotifyBushos] = useState<string[]>([]);
    const [notifyPrefectures, setNotifyPrefectures] = useState<Prefectures[]>([]);
    const [userPermission, setUserPermission] = useState<Permissions | null>(null);
    const [userRegistrationMenu, setUserRegistrationMenu] = useState(false);
    async function update(): Promise<void> {
        fetch(`/api/v1/getdata?email=${getEmail()}`)
            .then(response => response.json())
            .then(data => {
                setNotifyBushos(data.notifyBushos);
                setNotifyPrefectures(data.notifyPrefectures);
                setUserPermission(data.permission === 'OWNER' ? Permissions.OWNER : data.permission === 'ADMIN' ? Permissions.ADMIN : data.permission === 'MODERATOR' ? Permissions.MODERATOR : Permissions.USER);
            })
            .catch(e => console.error(e));
    }

    function onNotifyBushoChange(index: number): void {
        fetch('/api/v1/onbushochange', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: bushos[index].name,
                email: getEmail()
            })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                }
                update();
            })
            .catch(e => console.error(e));
    }

    function onNotifyPrefectureChange(index: number): void {
        fetch('/api/v1/onprefecturechange', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: prefecturesArray[index],
                email: getEmail()
            })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                }
                update();
            })
            .catch(e => console.error(e));
    }

    function isTheBushoEnabled(index: number): boolean {
        const bushoName: string = bushos[index].name;
        return notifyBushos.includes(bushoName);
    }

    function isThePrefectureEnabled(index: number): boolean {
        const prefecture: Prefectures = prefecturesArray[index];
        return notifyPrefectures.includes(prefecture);
    }

    function onBushoSelectAll(): void {
        fetch('/api/v1/enableallbushos', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: getEmail() })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                } else {
                    update();
                }
            })
            .catch(e => console.error(e));
    }

    function onBushoDeselectAll(): void {
        fetch('/api/v1/disableallbushos', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: getEmail() })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                } else {
                    update();
                }
            })
            .catch(e => console.error(e));
    }

    function onPrefectureSelectAll(): void {
        fetch('/api/v1/enableallprefectures', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: getEmail() })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                } else {
                    update();
                }
            })
            .catch(e => console.error(e));
    }

    function onPrefectureDeselectAll(): void {
        fetch('/api/v1/disableallprefectures', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: getEmail() })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                } else {
                    update();
                }
            })
            .catch(e => console.error(e));
    }

    const [registrationEmail, setRegistrationEmail] = useState<string | null>(null);
    const [registrationPermission, setRegistrationPermission] = useState<Permissions | null>(null);

    interface User {
        _id: string;
        email: string;
        permission: Permissions;
        notifyBushos: string[];
        notifyPrefectures: string[];
    };

    const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    function updateUserSetting(): void {
        fetch('/api/v1/getusers', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: getEmail()
            })
        })
            .then(response => response.json())
            .then(data => {
                setRegisteredUsers(data);
                const foundUser = data.find((user: User) => user.email === getEmail());
                setLoggedInUser(foundUser ? foundUser : null);
            })
            .catch(e => console.error(e));
    }
    useEffect(() => {
        updateUserSetting();
    }, [selected === 'user_setting', userRegistrationMenu]);

    function registerUser(): void {
        fetch('/api/v1/registeruser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: getEmail(),
                registrationEmail: registrationEmail,
                registrationPermission: registrationPermission
            })
        })
            .then(response => {
                if (response.status === 200) {
                    closeUserRegistrationMenu();
                    setRegistrationEmail('');
                    setRegistrationPermission(null);
                } else {
                    alert('エラーが発生しました。もう一度やり直してください。');
                }
            })
            .catch(e => console.error(e));
    }

    function openUserRegistrationMenu(): void {
        setUserRegistrationMenu(true);
    }

    function closeUserRegistrationMenu(): void {
        setUserRegistrationMenu(false);
    }

    const [userEditMenu, setUserEditMenu] = useState(false);
    const [editUserEmail, setEditUserEmail] = useState<string | null>(null);
    const [editUserPermission, setEditUserPermission] = useState<Permissions | null>(null);

    function openUserEditMenu(index: number): void {
        setEditUserEmail(registeredUsers[index].email);
        setEditUserPermission(registeredUsers[index].permission);
        setUserEditMenu(true);
    }

    function closeUserEditMenu(): void {
        setUserEditMenu(false);
    }

    function editUser(): void {
        fetch('/api/v1/edituser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: getEmail(),
                userEmail: editUserEmail,
                userPermission: editUserPermission
            })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                } else {
                    updateUserSetting();
                    closeUserEditMenu();
                    setEditUserEmail(null);
                    setEditUserPermission(null);
                }
            })
            .catch(e => console.error(e));
    }

    function deleteUser(index: number): void {
        if (!window.confirm(`本当に${registeredUsers[index].email}を削除しますか?`)) return;
        fetch('/api/v1/deleteuser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: getEmail(),
                userIndex: index
            })
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('エラーが発生しました。もう一度やり直してください。');
                } else {
                    updateUserSetting();
                }
            })
            .catch(e => console.error(e));
    }

    function isHigherPermission(userPerm: Permissions, guestPerm: Permissions): boolean {
        const permissionsOrder = [
            Permissions.OWNER,
            Permissions.ADMIN,
            Permissions.MODERATOR,
            Permissions.USER
        ];

        const index1 = permissionsOrder.indexOf(userPerm);
        const index2 = permissionsOrder.indexOf(guestPerm);

        if (index1 === index2) {
            return false;
        }

        return index1 !== -1 && index2 !== -1 && index1 < index2;
    }

    function getAllLowerPermission(current: Permissions): Permissions[] {
        const permissionsOrder = [
            Permissions.OWNER,
            Permissions.ADMIN,
            Permissions.MODERATOR,
            Permissions.USER
        ];

        const userIndex = permissionsOrder.indexOf(current);

        if (userIndex === -1) {
            return [];
        }

        return permissionsOrder.slice(userIndex + 1);
    }

    function getDescriptionOfPermission(permission: Permissions): string {
        const descriptionObject = PermissionsDescription.find(user => user.value === permission);
        return descriptionObject ? descriptionObject.description : 'NO';
    }

    return (
        <Grid container spacing={3}>
            {!isMobile && (
                <Drawer sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, backgroundColor: '#f0f4f9' } }} variant="permanent">
                    <List>
                        <ListItem button onClick={() => onSidebarSelected('busho')} selected={selected === 'busho'}>
                            <ListItemText primary='通知する武将' />
                        </ListItem>
                        <ListItem button onClick={() => onSidebarSelected('prefecture')} selected={selected === 'prefecture'}>
                            <ListItemText primary='通知する都道府県' />
                        </ListItem>
                        {(userPermission === Permissions.OWNER || userPermission === Permissions.ADMIN || userPermission === Permissions.MODERATOR) && (
                            <ListItem key='user_setting' button onClick={() => onSidebarSelected('user_setting')} selected={selected === 'user_setting'}>
                                <ListItemText primary='ユーザー設定' />
                            </ListItem>
                        )}
                        <ListItem button onClick={(e) => { setIsAccountMenuOpen(!isAccountMenuOpen); setAnchorEl(e.currentTarget); }} sx={{ position: 'fixed', bottom: 0, width: 240, '&:hover': { backgroundColor: '#eaeaea' }, backgroundColor: '#f0f4f9' }} key='account'>
                            <ListItemText primary={loggedInUser ? loggedInUser.email : 'null'} />
                        </ListItem>
                        <Menu
                            anchorEl={anchorEl}
                            open={isAccountMenuOpen}
                            onClose={handleAccountMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            PaperProps={{
                                style: {
                                    width: 200,
                                    height: 80,
                                    transform: 'translateY(-100%)',
                                    transition: 'transform 0.3s ease-in-out'
                                }
                            }}>
                            <List>
                                <ListItem key='busho' button onClick={() => { handleAccountMenuClose(); signout(); }}>
                                    <ListItemText primary='サインアウト' />
                                </ListItem>
                            </List>
                        </Menu>
                    </List>
                </Drawer>
            )}

            {isMobile && (
                <Grid item xs={12}>
                    <div style={{ height: 44 }}>
                        <IconButton onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}>
                            <MenuIcon />
                        </IconButton>
                        <Button onClick={(e) => { setIsAccountMenuOpen(!isAccountMenuOpen); setAnchorEl(e.currentTarget) }} sx={{ position: 'absolute', top: 10, right: 8, color: 'black' }}>{loggedInUser ? loggedInUser.email : 'null'}</Button>
                        <Menu
                        anchorEl={anchorEl}
                            open={isAccountMenuOpen}
                            onClose={handleAccountMenuClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{ style: { width: '100%' } }}>
                            <List>
                                <ListItem key='busho' button onClick={() => { handleAccountMenuClose(); signout(); }}>
                                    <ListItemText primary='サインアウト' />
                                </ListItem>
                            </List>
                        </Menu>
                    </div>
                    <Divider />
                </Grid>
            )}
            {isMobile && (
                <Menu
                anchorEl={anchorEl}
                    open={isMobileSidebarOpen}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    PaperProps={{ style: { width: '100%' } }}
                >
                    <List>
                        <ListItem key='busho' button onClick={() => { handleClose(); setSelected('busho'); }}>
                            <ListItemText primary='通知する武将' />
                        </ListItem>
                        <ListItem key='prefecture' button onClick={() => { handleClose(); setSelected('prefecture'); }}>
                            <ListItemText primary='通知する都道府県' />
                        </ListItem>
                        {(userPermission === Permissions.OWNER || userPermission === Permissions.ADMIN || userPermission === Permissions.MODERATOR) && (
                            <ListItem key='user_setting' button onClick={() => { handleClose(); setSelected('user_setting') }}>
                                <ListItemText primary='ユーザー設定' />
                            </ListItem>
                        )}
                    </List>
                </Menu>
            )}

            {selected === 'busho' && (
                <Grid item marginLeft={isMobile ? '0' : '240'}>
                    <Typography variant="h6" fontWeight='light'>小判茶室を通知する武将を選択してください</Typography>
                    <Button variant='contained' onClick={onBushoSelectAll} sx={{ marginRight: 1 }}>全選択</Button>
                    <Button variant="contained" onClick={onBushoDeselectAll}>全選択解除</Button>
                    <br />
                    <br />
                    {bushos.map((obj, index) => (
                        <label key={index}>
                            <input type="checkbox" checked={isTheBushoEnabled(index)} onChange={() => onNotifyBushoChange(index)} />
                            <span style={{ fontFamily: 'Roboto, sans-serif' }}>{obj.name} ({Object.values(obj.military)})</span>
                            <br />
                            <br />
                        </label>
                    ))}
                </Grid>
            )}

            {selected === 'prefecture' && (
                <Grid item marginLeft={isMobile ? '0' : '240'}>
                    <Typography variant="h6" fontWeight='light'>小判茶室を通知する都道府県を選択してください</Typography>
                    <Button variant="contained" onClick={onPrefectureSelectAll} sx={{ marginRight: 1 }}>全選択</Button>
                    <Button variant="contained" onClick={onPrefectureDeselectAll}>全選択解除</Button>
                    <br />
                    <br />
                    {Object.keys(Prefectures).map((prefecture, index) => (
                        <label key={index}>
                            <input type="checkbox" checked={isThePrefectureEnabled(index)} onChange={() => onNotifyPrefectureChange(index)} />
                            <span style={{ fontFamily: 'Roboto, sans-serif' }}>{prefecture}</span>
                            <br />
                            <br />
                        </label>
                    ))}
                </Grid>
            )}

            {selected === 'user_setting' && (
                <Grid item marginLeft={isMobile ? '0' : '240'}>
                    <Typography variant="h6">ユーザー設定</Typography>
                    <Button variant="contained" onClick={openUserRegistrationMenu}>ユーザーの追加</Button>
                    <List sx={{ marginTop: '10px' }}>
                        {registeredUsers.map((user, index) => (
                            <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                                <ListItem key={index} style={{ marginBottom: '10px' }}>
                                    <ListItemText primary={`メールアドレス: ${user.email}`} secondary={`権限: ${user.permission}`} />
                                    {(loggedInUser && isHigherPermission(loggedInUser.permission, user.permission)) && (
                                        <div>
                                            <IconButton onClick={() => openUserEditMenu(index)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => deleteUser(index)}>
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    )}
                                </ListItem>
                            </Paper>
                        ))}
                    </List>

                    <Modal open={userRegistrationMenu} onClose={closeUserRegistrationMenu} BackdropComponent={Backdrop} BackdropProps={{ style: { backgroundColor: 'transparent' } }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.paper' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', backgroundColor: 'background.paper', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', padding: '20px' }}>
                            <Typography variant="h6" fontWeight='normal'>ユーザーを追加する</Typography>
                            <TextField label='メールアドレス' type="email" value={registrationEmail} onChange={(e) => setRegistrationEmail(e.target.value)} fullWidth margin="normal" />
                            <Select value={registrationPermission} onChange={(e) => setRegistrationPermission(e.target.value as Permissions)} fullWidth displayEmpty placeholder="権限">
                                {getAllLowerPermission(loggedInUser ? loggedInUser.permission : Permissions.USER).map(permission => (
                                    <MenuItem value={permission}>{permission.toString()} ({getDescriptionOfPermission(permission)})</MenuItem>
                                ))}
                            </Select>
                            <Button variant="contained" onClick={registerUser} disabled={!registrationEmail || !registrationPermission} sx={{ marginTop: 1 }}>追加</Button>
                        </div>
                    </Modal>

                    <Modal open={userEditMenu} onClose={closeUserEditMenu} BackdropComponent={Backdrop} BackdropProps={{ style: { backgroundColor: "transparent" } }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'background.paper' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', backgroundColor: 'background.paper', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', padding: '20px' }}>
                            <Typography variant="h6" fontWeight='normal'>ユーザーを編集する</Typography>
                            <TextField label='メールアドレス' type="email" value={editUserEmail} disabled fullWidth margin="normal" />
                            <Select value={editUserPermission} onChange={(e) => setEditUserPermission(e.target.value as Permissions)} fullWidth displayEmpty placeholder="権限">
                                {getAllLowerPermission(loggedInUser ? loggedInUser.permission : Permissions.USER).map(permission => (
                                    <MenuItem value={permission}>{permission.toString()} ({getDescriptionOfPermission(permission)})</MenuItem>
                                ))}
                            </Select>
                            <Button variant="contained" onClick={editUser} disabled={!editUserEmail || !editUserPermission} sx={{ marginTop: 1 }}>送信</Button>
                        </div>
                    </Modal>
                </Grid>
            )}
        </Grid>
    );
}