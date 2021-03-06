import React from 'react';
import { client } from 'client';
import appConfig from 'app.config';
import usePagination from 'hooks/usePagination';
import {
  Footer,
  Header,
  EntryHeader,
  LoadMore,
  Main,
  Projects,
  SEO,
} from 'components';
import { getNextStaticProps } from '@faustjs/next';
import { pageTitle } from 'utils';

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const projects = useQuery().projects({
    first: appConfig.postsPerPage,
  });

  const { data, fetchMore, isLoading } = usePagination(
    (query, args) => {
      const { nodes, pageInfo } = query.projects(args);
      return {
        nodes: Array.from(nodes),
        pageInfo,
      };
    },
    { nodes: projects?.nodes, pageInfo: projects?.pageInfo }
  );

  return (
    <>
      <SEO title={pageTitle(generalSettings, 'Portfolio')} />

      <Header />

      <Main>
        <EntryHeader title="Portfolio" />
        <div className="container">
          <Projects projects={data.nodes} id="portfolio-list" />
          <LoadMore
            pageInfo={data.pageInfo}
            isLoading={isLoading}
            fetchMore={fetchMore}
            className="text-center"
          />
        </div>
      </Main>

      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
