import { Grid, Paper, Table, TableCell, TableBody, TableContainer, TableRow, TextField } from '@mui/material';
import { getQuestionAnalytics } from 'AxiosInstance';
import { useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { padding } from '@mui/system';

const QuestionAnalytics = () => {
    const location = useLocation();
    const { prop1 } = location.state;
    const options = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4', 'Answer 5', 'Answer 6'];
    const [timesPicked, setTimesPicked] = useState('');
    console.log('roter prop', prop1);
    const [quesData, setQuesData] = useState([
        {
            code: prop1?.code,
            question: prop1?.statements,
            id: prop1.id,
            answer: prop1.answers,
            option: {
                option1: prop1.options.options[0],
                option2: prop1.options.options[1],
                option3: prop1.options.options[2],
                option4: prop1.options.options[3],
                option5: prop1.options.options[4],
                option6: prop1.options.options[5]
            }
        }
    ]);
    console.log('quesData', quesData[0]);
    const [record, SetRecod] = useState([]);
    const fetchQuestionAnalysis = async () => {
        getQuestionAnalytics(prop1.id)
            .then((res) => {
                console.log('getting all Records ',res);
                if(res.status === 200){
                    SetRecod(res.data.data);
                }
            })
            .catch((error) => {
                console.log('error in getting all Records ', error);
            });
    };

    useEffect(() => {
        fetchQuestionAnalysis();
        
    }, []);
    console.log('record data', record[0]?.options);
    const cardStyles = {
        background: 'white',
        color: 'white'
    };

    let sum = 0;
    if (record[0]?.options && record[0]?.options.length > 0) {
        record[0]?.options.forEach((option) => {
            sum += option.option_count;
        });
    }
 
        const    correctOption = record[0]?.options.find(row => row.option === quesData[0].answer);
        console.log("correct", correctOption)
    
   



    console.log('sum', sum);
    
   
        const  percentages = ((( correctOption?.option_count/ sum) * 100).toFixed(2));
    return (
        <div
            style={{
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                paddingLeft: '10px',
                width: '100%',
                padding: '20px',
                paddingTop: '20px'
            }}
        >
            <h2 style={{ textAlign: 'center',color: '#000000', }}>Question Analytics</h2>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        InputLabelProps={{
                            style: {
                                color: 'grey[500]'
                            }
                        }}
                        sx={{
                            width: 100,
                            height: 20
                        }}
                        type={'text'}
                        label={'Code'}
                        value={quesData[0].code}
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={9} sm={9}>
                    <TextField
                        InputLabelProps={{
                            style: {
                                color: 'grey[500]'
                            }
                        }}
                        multiline
                        sx={{
                            width: 500
                        }}
                        type={'text'}
                        label={'Question'}
                        value={quesData[0].question}
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={3} sm={3}>
                   
                     <TextField
                        InputLabelProps={{
                            style: {
                                color: 'grey[500]'
                            }
                        }}
                        type={'text'}
                        label={'Times Played'}
                        variant="standard"
                        value={sum}
                    />
                </Grid>
            
               
                <Grid item xs={12} sm={12} style={{
                    paddingBottom: '30px' 
                }}>
                    <TableContainer component={Paper}>
                        <Table style={cardStyles}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Correct Answer</TableCell>
                                {record[0]?.options.map((row, index) => (
                                    <TableCell style={{ fontWeight: 'bold' }}>{options[index]}</TableCell>
                                ))}
                            </TableRow>
                            <TableBody>
                                <TableRow>
                                    <TableCell></TableCell>

                                    <TableCell>{quesData[0]?.answer}</TableCell>

                                    {record[0]?.options.map((row) =>
                                        row.option == quesData[0].answer ? ' ' : <TableCell>{row.option}</TableCell>
                                    )}
                                    
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Times Picked</TableCell>
                                    <TableCell>{correctOption?.option_count}</TableCell>
                                    {record[0]?.options.map((row, index) => {
                                
                                        return row.option == quesData[0].answer ? (
                                            ' '
                                        ) : (
                                            <TableCell key={index}>{row.option_count || 0}</TableCell>
                                        );
                                    })}
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{ fontWeight: 'bold' }}>Percentage</TableCell>
                                    <TableCell>{percentages}%</TableCell>
                                    {record[0]?.options.map((e) => e.option === quesData[0].answer ? '' :<TableCell>{((e.option_count / sum) * 100).toFixed(2) + "%"}</TableCell> )};

                                </TableRow>{' '}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default QuestionAnalytics;
