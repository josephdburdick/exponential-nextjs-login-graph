import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const graphData = {
    name: 'ETH',
    chain: 'Ethereum',
    protocol: 'Lido',
    base: 0.043,
    reward: 0,
    rewards: {},
    apy: 0.043,
    apy_7_day: null,
    tvl: 5997508308,
    risk: {},
    series: [
      {
        date: '2021-12-15T00:00:00.000Z',
        apy: '0.04900000',
        tvl: '6317164788',
      },
      {
        date: '2021-12-16T00:00:00.000Z',
        apy: '0.04900000',
        tvl: '6269307359',
      },
      {
        date: '2022-03-10T00:00:00.000Z',
        apy: '0.04300000',
        tvl: '5997508308',
      },
    ],
  }

  return NextResponse.json({ data: graphData })
}
