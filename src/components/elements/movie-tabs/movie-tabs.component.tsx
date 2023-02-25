import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid, Box, Avatar, Text, HStack } from '@chakra-ui/react'
import API_ENDPOINT from '../../../utils/api-endpoints/API_ENDPOINT';
import Cast from '../../../utils/interfaces/Cast'
import CrewCastCard from '../crew-cast-card/crew-cast-card';

const getImportantCrews = (crews:Cast[]) => {
  const IMPORTANT_CREWS_JOB = ['Executive Producer', 'Producer', 'Director', 'Casting' ]

  return crews.filter(crew => IMPORTANT_CREWS_JOB.includes(crew.job))
}

const MovieTabs = ({ casts, crews }:{ casts:Cast[], crews:Cast[] }) => {

  crews = getImportantCrews(crews);

  return (
    <Tabs>
    <TabList>
        <Tab>Casts</Tab>
        <Tab>Crews</Tab>
    </TabList>

    <TabPanels>
        <TabPanel>
          <Grid templateColumns="repeat(3, 1fr)">
            {
              casts.map(c => {
                return (
                  <CrewCastCard type='cast' person={c} />
                )
              })
            }
          </Grid>
        </TabPanel>
        <TabPanel>
          <Grid templateColumns="repeat(3, 1fr)" rowGap="24px">
            {
              crews.map(c => {
                return (
                  <CrewCastCard type='crew' person={c} />
                )
              })
            }
          </Grid>
        </TabPanel>
    </TabPanels>
    </Tabs>
  )
}

export default MovieTabs;