/* 
1. MoneyView
2. RamFin
3. Mpocket 
4. MoneyTap
*/

import Image from 'next/image';
import User from '@/lib/models/user.model';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Search from '@/components/search';
export const fetchCache = 'force-no-store';

async function mv_status(user: any): Promise<any> {
    try {
        if (!user || !user.accounts) return { error: 'User or user accounts not found' };
        const moneyViewAccount = user.accounts.find((account: any) => account.name === 'MoneyView');
        if (!moneyViewAccount) return { error: 'MoneyView account not found' };

        const tokenResponse = await fetch('https://atlas.whizdm.com/atlas/v1/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ partnerCode: 158, userName: 'credmantra', password: 'p-wWj6.13M' }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            return { error: `Failed to fetch token: ${tokenResponse.status} ${tokenResponse.statusText}. ${errorText}` };
        }

        const tokenData = await tokenResponse.json();
        const token = tokenData.token;

        const leadStatusResponse = await fetch(`https://atlas.whizdm.com/atlas/v1/lead/status/${moneyViewAccount.id}`, {
            method: 'GET',
            headers: {
                token: token,
            },
        });

        if (!leadStatusResponse.ok) {
            const errorText = await leadStatusResponse.text();
            return { error: `Failed to fetch lead status: ${leadStatusResponse.status} ${leadStatusResponse.statusText}. ${errorText}` };
        }

        const leadStatusData = await leadStatusResponse.json();
        return leadStatusData;
    } catch (error) {
        console.error('Error in mv_status:', error);
        return { error: 'Error in mv_status' };
    }
}

async function ramfin_status(phone: string): Promise<any> {
    try {
        const scResponse = await fetch('https://credmantra.com/api/v1/partner-api/ram/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: phone }),
        });
        if (!scResponse.ok) {
            const errorData = await scResponse.json();
            return { error: errorData.msg };
        }
        const scStatusData = await scResponse.json();
        return scStatusData;
    } catch (error) {
        return { error: 'Error in smartcoin_status' };
    }
}

async function mpkt_status(user: any): Promise<any> {
    if (!user || !user.accounts) return { error: 'User or user accounts not found' };
    const mpktAccount = user.accounts.find((account: any) => account.name === 'Mpocket');
    if (!mpktAccount) return { error: 'Mpokket account not found' };

    const mpktRes = await fetch('http://13.201.83.62/api/v1/mpocket/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: mpktAccount.data.requestId }),
    });
    if (!mpktRes.ok) {
        const errorData = await mpktRes.json();
        return { error2: errorData };
    }
    const mpktStatusData = await mpktRes.json();
    console.log('mpktStatusData');
    console.log(mpktStatusData);
    if (mpktStatusData.data === undefined) {
        return { error: 'No Data' };
    }
    return mpktStatusData.data;
}

async function cashe_status(user: any): Promise<any> {
    if (!user || !user.accounts) return { error: 'User or user accounts not found' };
    const casheAccount = user.accounts.find((account: any) => account.name === 'Cashe');
    if (!casheAccount) return { error: 'Cashe account not found' };
    const casheRes = await fetch('https://credmantra.com/api/v1/partner-api/cashe/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            partner_name: 'CredMantra_Partner1',
            partner_customer_id: casheAccount.id,
        }),
    });
    if (!casheRes.ok) {
        const errorData = await casheRes.json();
        return { error2: errorData };
    }
    const casheStatusData = await casheRes.json();
    return casheStatusData;
}

async function fibe_status(user: any): Promise<any> {
    if (!user || !user.accounts) return { error: 'User or user accounts not found' };
    const fibeAccount = user.accounts.find((account: any) => account.name === 'Fibe');
    if (!fibeAccount) return { error: 'Fibe account not found' };
    const fibeRes = await fetch('https://credmantra.com/api/v1/partner-api/fibe/customer-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ custRefNo: fibeAccount.res.esRefId }),
    });
    if (!fibeRes.ok) {
        const errorData = await fibeRes.json();
        return { error2: errorData };
    }
    const fibeStatusData = await fibeRes.json();
    return fibeStatusData;
}

async function moneytap_status(user: any): Promise<any> {
    if (!user || !user.accounts) return { error: 'User or user accounts not found' };
    const moneytapAccount = user.accounts.find((account: any) => account.name === 'MoneyTap');
    if (!moneytapAccount) return { error: 'Moneytap account not found' };

    const moneytapRes = await fetch('https://credmantra.com/api/v1/partner-api/moneytap/moneytap/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customerId: moneytapAccount.customerId,
            phone: user.phone,
        }),
    });
    if (!moneytapRes.ok) {
        const errorData = await moneytapRes.json();
        return { error2: errorData };
    }
    const moneytapStatusData = await moneytapRes.json();
    return moneytapStatusData;
}

async function get_status(user: any): Promise<any> {
    try {
        const statusFunctions = [
            mv_status(user),
            ramfin_status(user.phone),
            moneytap_status(user),
            fibe_status(user),
            cashe_status(user),
            mpkt_status(user),
        ];
        const results = await Promise.all(statusFunctions);
        return {
            MoneyView: results[0],
            RamFin: results[1],
            MoneyTap: results[2],
            Fibe: results[3],
            Cashe: results[4],
            Mpocket: results[5],
        };
    } catch (error) {
        console.error('Error in get_status:', error);
        throw error;
    }
}

export default async function Phone({ params }: { params: { phone: string } }) {
    // SETUP
    let phone = '';
    if (params.phone) phone = params.phone.toString();
    const userArray = await User.find({ phone: phone });
    const user = userArray[0];
    const res = await get_status(user);
    console.log('main res');
    console.log(res);

    return (
        <main className="flex min-h-screen flex-col items-stretch p-10 px-5 md:p-20 md:px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <a href="/" className="text-2xl font-bold">
                    DATABASE
                </a>
                <Image className="rounded" src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>
            <Search phone={phone} mv={true} />
            <div className="items-center justify-center">
                <h1 className="py-10 font-bold">User Status</h1>
                {Object.entries(res).map(([lender, status]: any) => (
                    <div
                        className={`flex flex-col border border-gray p-2 my-2 rounded ${status.error === undefined ? '' : 'bg-red-100 border-red-400 text-red-700'}`}
                        key={lender}
                    >
                        <h1 className="text-l w-full font-semibold">{lender}</h1>
                        <Table>
                            <TableBody>
                                {Object.entries(status).map(
                                    ([key, value]: any) =>
                                        value && (
                                            <TableRow className="flex justify-between" key={key}>
                                                <TableCell className="font-medium">{key}</TableCell>
                                                <TableCell className="text-right">{value.toString()}</TableCell>
                                            </TableRow>
                                        ),
                                )}
                            </TableBody>
                        </Table>
                    </div>
                ))}
            </div>
        </main>
    );
}
