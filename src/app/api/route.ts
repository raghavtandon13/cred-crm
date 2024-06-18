import User from '@/lib/models/user.model';

async function getData(dates: any) {
    try {
        console.log('h1:', dates);
        const start = dates.start;
        const end = dates.end;
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
        return { error: 'Error Occurred' };
    }
}

export async function POST(request: Request) {
    const res = await request.json();
    console.log(res);
    const dates = { start: res.dates.start, end: res.dates.end };

    const data = await getData(dates);
    return Response.json({ data });
}
