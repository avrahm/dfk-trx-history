import React, { useEffect, useState } from 'react';
import { getContractNameFromAddress } from '../../api/ContractAPI';
import { convertTo2Decimal, getTokenInfo } from '../../api/FormatAPI';

function TranferComponent({ details = false }) {

    try {
        if (details.name === 'Transfer') {
            return (
                <div className='container'>
                    <div className='row'>
                        <img src={details.token.logoURI} alt={details.symbol} className='tokenImg' />
                        {` ${details.value}  ${details.token.symbol} at ($)`}
                    </div>
                </div>
            )
        }
        return (
            <div className='container'>
                <div className='col'>
                    {details.map((detail, index) => {
                        if (detail.name === 'Transfer') {
                            return (<div className='row' key={index}>
                                <img src={detail.token.logoURI} alt={detail.symbol} className='tokenImg' />
                                {` ${detail.value}  ${detail.token.symbol} at ($)`}
                            </div>)
                        } else {
                            return '';
                        }
                    })}
                </div>
            </div>
        )
    } catch (error) {
        return <div>Transaction Failed</div>
    }


}

function TransactionDetails({ details = false, method, data }) {

    const renderSwitch = (method) => {
        try {
            switch (method) {
                case 'swapExactETHForTokens': {
                    return <TranferComponent details={details} />
                }
                case 'swapExactTokensForETH': {
                    return <TranferComponent details={details} />
                }
                case 'swapETHForExactTokens': {
                    return <TranferComponent details={details} />
                }
                case 'swapExactTokensForTokens': {
                    return <TranferComponent details={details} />
                }
                case 'addLiquidityETH': {
                    return <TranferComponent details={details} />
                }
                case 'addLiquidity': {
                    return <TranferComponent details={details} />
                }
                case 'removeLiquidityETH': {
                    return <TranferComponent details={details} />
                }
                case 'deposit': {
                    return <TranferComponent details={details} />
                }
                case 'convertMultiple': {
                    return <TranferComponent details={details} />
                }
                case 'claimRewards': {
                    return <TranferComponent details={details} />
                }
                case 'enter': {
                    if (!details.length) return <div>Transaction Failed</div>
                    const profitToken = details[0];
                    const lossToken = details[1];
                    return (
                        <div className='container'>
                            <div className='col'>
                                <div className='row lossToken'>
                                    <img src={lossToken.token.logoURI} alt={lossToken.symbol} className='tokenImg' />
                                    {`- ${lossToken.value}  ${lossToken.token.symbol} at ($)`}
                                </div>
                                <div className='row profitToken'>
                                    <img src={profitToken.token.logoURI} alt={profitToken.symbol} className='tokenImg' />
                                    {`+ ${profitToken.value}  ${profitToken.token.symbol} at ($)`}
                                </div>
                            </div>
                        </div>
                    )
                }
                case 'leave': {
                    if (!details.length) return <div>Transaction Failed</div>
                    const lossToken = details[0];
                    const profitToken = details[1];
                    return (
                        <div className='container'>
                            <div className='col'>
                                <div className='row lossToken'>
                                    <img src={lossToken.token.logoURI} alt={lossToken.symbol} className='tokenImg' />
                                    {`- ${lossToken.value}  ${lossToken.token.symbol} at ($)`}
                                </div>
                                <div className='row profitToken'>
                                    <img src={profitToken.token.logoURI} alt={profitToken.symbol} className='tokenImg' />
                                    {`+ ${profitToken.value}  ${profitToken.token.symbol} at ($)`}
                                </div>
                            </div>
                        </div>
                    )
                }
                case 'bid': {
                    if (!data) return <div>Transaction Failed</div>
                    return (
                        <div className='container'>
                            <div className='col'>
                                Bought Hero #{data.params[0].value} for {convertTo2Decimal(data.params[1].value)} JEWEL
                            </div>
                        </div>
                    )
                }
                case 'startQuest': {
                    if (!data) return <div>Transaction Failed</div>
                    try {
                        // const newQuest = { questId: data.formattedData.details[0].questId, questType: getContractNameFromAddress(data.methodData.params[1].value), heros: data.methodData.params[0].value }
                        // quests.push({ ...newQuest })
                        return (
                            <div className='container'>
                                <div className='col'>
                                    Start Quest #{data.formattedData.details[0].questId}: {getContractNameFromAddress(data.methodData.params[1].value)} <br />
                                    {data.methodData.params[0].value.length > 1 ? `Heros: (${data.methodData.params[0].value.join(', ')})` : `Hero: (${data.methodData.params[0].value})`}
                                </div>
                            </div>
                        )
                    } catch (error) {
                        return (
                            <div>Start Quest: Error retreiving details</div>
                        )
                    }
                }
                case 'startQuestWithData': {
                    if (!data) return <div>Transaction Failed</div>
                    try {
                        // const newQuest = { questId: data.formattedData.details[0].questId, questType: getContractNameFromAddress(data.methodData.params[1].value), heros: data.methodData.params[0].value }
                        // quests.push({ ...newQuest })
                        return (
                            <div className='container'>
                                <div className='col'>
                                    Start Quest #{data.formattedData.details[0].questId}: {getContractNameFromAddress(data.methodData.params[1].value)} <br />
                                    {data.methodData.params[0].value.length > 1 ? `Heros: (${data.methodData.params[0].value.join(', ')})` : `Hero: (${data.methodData.params[0].value})`}
                                </div>
                            </div>
                        )
                    } catch (error) {
                        return (
                            <div>Start Quest: No Details</div>
                        )
                    }
                }
                case 'completeQuest': {
                    if (!data) return <div>Transaction Failed</div>
                    try {
                        return data.formattedData.details.map((detail, index) => {
                            switch (detail.name) {
                                case "QuestReward": {
                                    if (detail.rewardItem === '0x0000000000000000000000000000000000000000') return '';
                                    let rewardItem = getContractNameFromAddress(detail.rewardItem);
                                    let quantity = detail.itemQuantity;
                                    if (rewardItem === 'JewelToken') {
                                        rewardItem = getTokenInfo(detail.rewardItem).symbol;
                                        quantity = convertTo2Decimal(detail.itemQuantity);
                                    }
                                    return (
                                        <div className='row' key={index}>
                                            Quest Reward for #{detail.questId}: {quantity} {rewardItem} by Hero #{detail.heroId}
                                        </div>
                                    )
                                }
                                case "QuestCompleted": {
                                    return (
                                        <div className='row' key={index}>
                                            Quest Completed for #{detail.questId} by Hero #{detail.heroId}
                                        </div>
                                    )
                                }
                                default:
                                    return '';
                            }
                        })
                    } catch (error) {
                        return (
                            <div>Completed Quest: Error retreiving details</div>
                        )
                    }
                }
                case 'cancelQuest': {
                    if (!data) return <div>Transaction Failed</div>
                    try {
                        return data.formattedData.details.map((detail, index) => {
                            switch (detail.name) {
                                case "QuestReward": {
                                    if (detail.rewardItem === '0x0000000000000000000000000000000000000000') return '';
                                    let rewardItem = getContractNameFromAddress(detail.rewardItem);
                                    let quantity = detail.itemQuantity;
                                    if (rewardItem === 'JewelToken') {
                                        rewardItem = getTokenInfo(detail.rewardItem).symbol;
                                        quantity = convertTo2Decimal(detail.itemQuantity);
                                    }
                                    return (
                                        <div className='row' key={index}>
                                            Quest Reward for #{detail.questId}: {quantity} {rewardItem} by Hero #{detail.heroId}
                                        </div>
                                    )
                                }
                                case "QuestCanceled": {
                                    return (
                                        <div className='row' key={index}>
                                            Quest Canceled for #{detail.questId} by Hero #{detail.heroId}
                                        </div>
                                    )
                                }
                                default:
                                    return '';
                            }
                        })
                    } catch (error) {
                        return (
                            <div>Completed Quest: Error retreiving details</div>
                        )
                    }
                }
                case 'startMeditation': {
                    if (!data) return <div>Transaction Failed</div>
                    try {
                        return data.formattedData.details.map((detail, index) => {
                            switch (detail.name) {
                                case "Transfer": {
                                    // console.log('here', detail);
                                    return <TranferComponent details={detail} key={index} />
                                }
                                case "MeditationBegun": {
                                    return (
                                        <div className='row' key={index}>
                                            Meditation Begun #{detail.questId} for Hero #{detail.heroId}
                                        </div>
                                    )
                                }
                                default:
                                    return '';
                            }
                        })
                    } catch (error) {
                        return (
                            <div>Start Meditation: No Details</div>
                        )
                    }
                }
                default:
                    return '---';
            }
        } catch (error) {
            console.log(method, details, error);
            return (<div>Error</div>);
        }
    }

    useEffect(() => {
        renderSwitch(method);
    }, [details])

    return (<div>{renderSwitch(method)}</div>);

}

export default TransactionDetails;
