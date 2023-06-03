import { useState, useEffect } from 'react'
import { fetcher } from '../utils'
import EChartsReact from 'echarts-for-react'

export default function Balanceboard() {
    const [data, setData] = useState([])
    const [condition, setCondition] = useState({ method: 'year' })
    const [xAxis, setxAxis] = useState<string[]>([])
    const [pcr, setPcr] = useState<number[]>([])
    const [rtkag, setRtkag] = useState<number[]>([])
    const [option, setOption] = useState<object>({
        xAxis: {
            type: 'category',
            data: xAxis
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: pcr,
                type: 'line'
            }
        ]
    })
    const getData = async () => {
        let OriginalData = await fetcher("epidemic/tests_malaysia.csv")
        console.log(OriginalData);
        const xArr: string[] = []
        const pcr: number[] = []
        const rtkag: number[] = []
        OriginalData = OriginalData.filter((item: any) => {
            const itemDate: string = item.date
            const itemDateArr = itemDate.split('-')
            const itemYear: number = Number(itemDateArr[0])
            const itemMonth: number = Number(itemDateArr[1])
            const itemDay: number = Number(itemDateArr[2])

            const currentDate = new Date()
            const currentYear = currentDate.getFullYear()
            const currentMonth: number = currentDate.getMonth() + 1

            switch (condition.method) {
                case 'year':
                    if (itemYear === currentYear) {
                        xArr.push(itemDate)
                        pcr.push(item['pcr'])
                        rtkag.push(item['rtk-ag'])
                    }
                    return itemYear === currentYear
                case 'month':
                    if (itemYear === currentYear && itemMonth === currentMonth) {
                        xArr.push(itemDate)
                        pcr.push(item['pcr'])
                        rtkag.push(item['rtk-ag'])
                    }
                    return itemYear === currentYear && itemMonth === currentMonth
                default:
                    break;
            }
        })
        setxAxis(xArr)
        setPcr(pcr)
        setRtkag(rtkag)
    }
    useEffect(() => {
        getData()
    }, [])
    useEffect(() => {
        setOption({
            title: {
                text: `Total Tests conducted (this ${condition.method})`,
                left: '3%',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis,
            },
            yAxis: {
                type: 'value'
            },
            legend: {
                data: ['rtk-ag', 'pcr']
            },
            series: [
                {
                    name: 'rtk-ag',
                    type: 'line',
                    // stack: 'Total',
                    data: rtkag,
                    areaStyle: {}
                },
                {
                    symbol: 'none',
                    name: 'pcr',
                    type: 'line',
                    // stack: 'Total',
                    data: pcr,
                    areaStyle: {}
                },
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
        })
    }, [xAxis, condition])
    return (
        <>
            <div>Balance Board</div>
            <div style={{ width: '80%', margin: '0 auto' }}>
                <EChartsReact style={{ marginTop: 100 }} option={option}></EChartsReact>
            </div >
        </>
    )
} 