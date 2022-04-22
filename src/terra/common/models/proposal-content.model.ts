import { Proposal as TerraProposal, CommunityPoolSpendProposal, ParameterChangeProposal } from 'nestjs-terra'
import { CommunityPoolSpendContent, ParameterChangeContent, TextContent } from 'src/terra/common/models'
import { ProposalContentType } from 'src/terra/common/unions'

export class ProposalContent {
  static fromTerra(content: TerraProposal.Content): ProposalContentType {
    const { title, description } = content ?? {}

    if (content instanceof CommunityPoolSpendProposal) {
      return new CommunityPoolSpendContent(title, description, content.recipient, content.amount)
    }

    if (content instanceof ParameterChangeProposal) {
      return new ParameterChangeContent(title, description, content.changes)
    }

    return new TextContent(title, description)
  }
}
