import Image from 'next/image';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import User from '@/lib/models/user.model';
import Search from '@/components/search';

async function getData(phone: string): Promise<any> {
    try {
        const hello = await User.find({ phone: phone }).lean();
        let res: any = {};
        if (hello[0] && hello[0].accounts) {
            const { accounts, ...details } = hello[0];
            if (accounts !== undefined && details !== undefined) {
                res.accounts = accounts;
                res.details = details;
            }
        }
        return res;
    } catch (error) {
        console.log('Error:', error);
        return 'Error Occurred';
    }
}

export default async function Phone({ params }: { params: { phone: string } }) {
    let phone = '';
    if (params.phone) {
        phone = params.phone.toString();
    }
    const res = await getData(phone);
    return (
        <main className="flex min-h-screen flex-col items-stretch p-10 px-5 md:p-20 md:px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <h1 className="text-2xl font-bold">DATABASE</h1>
                <Image className="rounded" src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>
            <Search phone={phone} />
            {res.accounts && res.details ? (
                <>
                    <div className="items-center justify-center">
                        <h1 className="py-10 font-bold">Personal Details</h1>
                        <Table>
                            <TableBody>
                                {Object.entries(res.details)
                                    .filter(
                                        ([key]) =>
                                            ![
                                                'eformFilled',
                                                'partner',
                                                'applications',
                                                'phoneOtpExpire',
                                                'phoneOtp',
                                                '__v',
                                                'detailsFilled',
                                                'role',
                                            ].includes(key),
                                    )
                                    .map(
                                        ([key, value]: any) =>
                                            value && (
                                                <TableRow key={key}>
                                                    <TableCell className="font-medium">{key}</TableCell>
                                                    <TableCell className="text-right">{value.toString()}</TableCell>
                                                </TableRow>
                                            ),
                                    )}

                                <TableRow>
                                    <TableCell className="font-medium">Total Accounts</TableCell>
                                    <TableCell className="text-right">{res.accounts.length}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <h1 className="py-10 font-bold">Account Details</h1>
                    {res.accounts.map((account: any, index: any) => (
                        <div key={index} className="items-center justify-center pb-10">
                            <h1 className="text-l w-full text-center font-semibold">{account.name}</h1>
                            <Table>
                                <TableBody>
                                    {Object.entries(account)
                                        .filter(([key]) => !['res', 'req', 'sent', 'name'].includes(key))
                                        .map(([key, value]: any) =>
                                            value ? (
                                                <TableRow key={key}>
                                                    <TableCell className="font-medium">{key}</TableCell>
                                                    <TableCell className="max-w-xs truncate text-right">{value.toString()}</TableCell>
                                                </TableRow>
                                            ) : null,
                                        )}
                                </TableBody>
                            </Table>
                            <hr />
                        </div>
                    ))}
                </>
            ) : (
                <div className="justify-center py-10 text-center">
                    <h1 className="text-2xl font-bold">NOT FOUND</h1>
                </div>
            )}
        </main>
    );
}
