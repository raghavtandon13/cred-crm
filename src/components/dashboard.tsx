import User from '@/lib/models/user.model';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

async function getData(dates: any): Promise<any> {
    try {
        const start = dates.dates.start;
        const end = dates.dates.end;
        const pipeline = [];

        if (start !== undefined && end !== undefined) {
            pipeline.push({
                $match: { updatedAt: { $gte: new Date(start), $lt: new Date(end) } },
            });
        }

        pipeline.push({
            $facet: {
                count1: [{ $match: { partnerSent: true } }, { $count: 'count' }],
                count2: [{ $match: { partnerSent: false, partner: 'MoneyTap' } }, { $count: 'count' }],
                count3: [{ $match: { partnerSent: true, 'accounts.name': 'Fibe' } }, { $count: 'count' }],
                count4: [{ $match: { partnerSent: true, 'accounts.name': 'Zype' } }, { $count: 'count' }],
                count5: [{ $match: { partnerSent: true, 'accounts.name': 'Cashe' } }, { $count: 'count' }],
                count6: [
                    {
                        $match: {
                            $expr: {
                                $gt: [{ $cond: { if: { $isArray: '$accounts' }, then: { $size: '$accounts' }, else: 0 } }, 2],
                            },
                        },
                    },
                    { $count: 'count' },
                ],
            },
        });

        const result = await User.aggregate(pipeline);
        const formatNumber = (number: any) => {
            return new Intl.NumberFormat('en-IN').format(number);
        };
        const res = {
            'Total Pushed Leads': formatNumber(result[0].count1[0] ? result[0].count1[0].count : 0),
            'Leads Pending': formatNumber(result[0].count2[0] ? result[0].count2[0].count : 0),
            'Total Fibe Leads': formatNumber(result[0].count3[0] ? result[0].count3[0].count : 0),
            'Total Zype Leads': formatNumber(result[0].count4[0] ? result[0].count4[0].count : 0),
            'Total Cashe Leads': formatNumber(result[0].count5[0] ? result[0].count5[0].count : 0),
            'User with 2+ Accounts': formatNumber(result[0].count6[0] ? result[0].count6[0].count : 0),
        };
        return res;
    } catch (error) {
        console.log('Error:', error);
        return 'Error Occurred';
    }
}

export default async function Dashboard(dates: any) {
    const res: any = await getData(dates);
    return (
        <div className="gap-2">
            <Table>
                <TableBody>
                    {Object.entries(res).map(
                        ([key, value]: any) =>
                            value && (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">{key}</TableCell>
                                    <TableCell className="text-right">{value.toString()}</TableCell>
                                </TableRow>
                            ),
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
